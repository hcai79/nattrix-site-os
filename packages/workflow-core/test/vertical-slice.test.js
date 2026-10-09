import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  validateSiteBlueprint, buildUrlInventory, loadRoutingPolicy, selectMockRoute,
  BudgetLedger, MockOpenRouterProvider, OpenRouterProvider, summarizeUsage, transition, retryFrom, validatePlanRows,
  validateEvidencePack, calculateRiskBand, exportCsv, parseCsv, BatchRunner, validateMediaManifest, MockSiteAdapter,
  StagingWordPressAdapter, renderGutenbergDraft, validateDraftPackage, createApprovalDecision
} from '../src/index.js';

const root = new URL('../../../', import.meta.url);
const readJson = async (path) => JSON.parse(await readFile(new URL(path, root), 'utf8'));

test('CircuitsAtHome blueprint meets the shared contract', async () => {
  const blueprint = await readJson('sites/circuitsathome/site-blueprint.json');
  assert.deepEqual(validateSiteBlueprint(blueprint), { valid: true, errors: [] });
});

test('mock site adapter uses fixtures for read-only inventory and rejects writes', async () => {
  const blueprint = await readJson('sites/circuitsathome/site-blueprint.json');
  const urlRecords = await readJson('packages/workflow-core/fixtures/circuits-url-inventory.json');
  const adapter = new MockSiteAdapter({ blueprint, urlRecords, categories: [{ slug: 'test-equipment' }] });
  assert.deepEqual(await adapter.getSite(), { site_id: 'circuits-at-home', domain: 'circuitsathome.com', status: 'pilot' });
  assert.equal((await adapter.listUrlInventory())[0].canonical_url, 'https://circuitsathome.com/multimeter-buying-guide');
  assert.deepEqual(await adapter.listCategories(), [{ slug: 'test-equipment' }]);
  await assert.rejects(adapter.createDraft(), /read-only/);
});

test('Gutenberg renderer creates escaped blocks and only permits cited HTTP(S) sources', () => {
  const content = renderGutenbergDraft({
    title: 'A <safe> draft',
    summary: 'A grounded summary.',
    sections: [{ heading: 'What to know', body: 'Use evidence first.' }],
    sources: [{ label: 'Official source', url: 'https://example.com/docs' }]
  });
  assert.match(content, /<!-- wp:heading/);
  assert.match(content, /A &lt;safe&gt; draft/);
  assert.match(content, /rel="nofollow noopener"/);
  assert.throws(() => renderGutenbergDraft({ title: 'X', summary: 'Y', sections: [{ heading: 'H', body: 'B' }], sources: [{ label: 'Bad', url: 'javascript:alert(1)' }] }), /HTTP\(S\)/);
});

test('staging adapter rejects production and only creates explicit staging drafts', async () => {
  assert.throws(() => new StagingWordPressAdapter({ baseUrl: 'https://example.com', siteId: 'site-a', environment: 'production' }), /staging environment/);
  const requests = [];
  const adapter = new StagingWordPressAdapter({
    baseUrl: 'https://staging.example.com',
    siteId: 'site-a',
    environment: 'staging',
    fetchImpl: async (url, options) => {
      requests.push({ url: url.toString(), options });
      return { ok: true, json: async () => ({ id: 55, status: 'draft', link: 'https://staging.example.com/?p=55' }) };
    }
  });
  await assert.rejects(() => adapter.createDraft({ contentId: 'support-1', title: 'Draft', content: 'Body', idempotencyKey: 'key-1', authorization: 'Basic runtime-only' }), /explicit allowStagingWrites/);
  const result = await adapter.createDraft({ contentId: 'support-1', title: 'Draft', content: 'Body', idempotencyKey: 'key-1', authorization: 'Basic runtime-only', allowStagingWrites: true });
  assert.equal(result.status, 'draft');
  const duplicate = await adapter.createDraft({ contentId: 'support-1', title: 'Changed title', content: 'Changed body', idempotencyKey: 'key-1', authorization: 'Basic runtime-only', allowStagingWrites: true });
  assert.equal(duplicate.id, result.id);
  assert.equal(requests.length, 1);
  assert.match(requests[0].url, /staging\.example\.com\/wp-json\/wp\/v2\/posts/);
  assert.equal(JSON.parse(requests[0].options.body).status, 'draft');
});

test('draft package QA combines Gutenberg, claim evidence, and media gates before human review', () => {
  const result = validateDraftPackage({
    draft: {
      stable_content_id: 'circuits-1', review_tier: 'standard', title: 'Multimeter guide', summary: 'A source-backed guide.',
      sections: [{ heading: 'Choose safely', body: 'Match the meter to the task.' }]
    },
    evidencePack: {
      claims: [{ text: 'The product supports a stated range.', class: 'verified_fact', impact: 'medium', confidence: 90, source_url: 'https://example.com/spec', source_type: 'manufacturer', checked_at: '2026-10-09T00:00:00Z' }]
    },
    mediaManifest: { assets: [{ asset_id: 'photo-1', type: 'article_image', origin: 'licensed', rights_note: 'Licensed for the article.', alt_text: 'A digital multimeter.' }] }
  });
  assert.equal(result.valid, true);
  assert.equal(result.readyForHumanReview, true);
  assert.match(result.blocks, /Multimeter guide/);

  const blocked = validateDraftPackage({
    draft: { stable_content_id: 'circuits-2', review_tier: 'deep', title: 'Electrical guide', summary: 'Summary.', sections: [{ heading: 'Safety', body: 'Use a professional.' }] },
    evidencePack: { claims: [{ text: 'Uncited safety claim.', class: 'verified_fact', impact: 'high', confidence: 90, source_url: '', source_type: 'unknown', checked_at: '2026-10-09T00:00:00Z' }] },
    mediaManifest: { assets: [] }
  });
  assert.equal(blocked.readyForHumanReview, false);
  assert.ok(blocked.errors.some((error) => error.code === 'citation_missing_or_invalid'));
});

test('inventory normalizes same-domain URLs and rejects canonical collisions', () => {
  const inventory = buildUrlInventory([
    { stable_url_id: 'url-1', url: 'https://circuitsathome.com/guides/multimeter/?campaign=x', title: 'Guide' }
  ], 'circuitsathome.com');
  assert.equal(inventory[0].canonical_url, 'https://circuitsathome.com/guides/multimeter');
  assert.throws(() => buildUrlInventory([
    { stable_url_id: 'a', url: '/guide/' }, { stable_url_id: 'b', url: 'https://circuitsathome.com/guide' }
  ], 'circuitsathome.com'), /Duplicate canonical URL/);
  assert.throws(() => buildUrlInventory([{ stable_url_id: 'x', url: 'https://example.com/' }], 'circuitsathome.com'), /must belong/);
});

test('routing policy stays mocked until model allowlists are benchmarked', async () => {
  const policy = loadRoutingPolicy(await readJson('config/model-routing.example.json'));
  const route = selectMockRoute(policy, 'support_draft');
  const provider = new MockOpenRouterProvider({ support_draft: { output: { title: 'Fixture title' }, usage: { input_tokens: 8, output_tokens: 3, cost_usd: 0 } } });
  const result = await provider.complete({ taskType: 'support_draft', input: { id: 'support-1' }, route });
  assert.equal(route.live, false);
  assert.equal(result.output.title, 'Fixture title');
  assert.equal(result.telemetry.provider, 'mock');
});

test('live provider cannot make a request without an explicit opt-in and an allowlisted model', async () => {
  assert.throws(() => new OpenRouterProvider({ apiKey: 'test-key' }), /allowPaidRequests/);
  const requests = [];
  const ledger = new BudgetLedger({ globalDailyCapUsd: 1, siteMonthlyCapUsd: 1, articleCapUsd: 1 });
  const provider = new OpenRouterProvider({
    apiKey: 'test-key',
    allowPaidRequests: true,
    fetchImpl: async (...args) => {
      requests.push(args);
      return { ok: true, json: async () => ({ model: 'approved-model', choices: [{ message: { content: 'fixture' } }], usage: { prompt_tokens: 2, completion_tokens: 1, cost: 0.01 } }) };
    }
  });
  await assert.rejects(
    provider.complete({ taskType: 'support_draft', model: 'not-approved', allowedModels: [], input: { messages: [] } }),
    /not allowlisted/
  );
  assert.equal(requests.length, 0);
  const result = await provider.complete({
    taskType: 'support_draft', model: 'approved-model', allowedModels: ['approved-model'],
    input: { messages: [{ role: 'user', content: 'fixture' }] }, budgetLedger: ledger,
    siteId: 'circuits-at-home', contentId: 'support-1', estimatedCostUsd: 0.02
  });
  assert.equal(result.telemetry.provider, 'openrouter');
  assert.equal(result.telemetry.estimated_cost_usd, 0.02);
  assert.equal(requests.length, 1);
  assert.doesNotMatch(requests[0][1].body, /test-key/);
  await assert.rejects(
    provider.complete({ taskType: 'support_draft', model: 'approved-model', allowedModels: ['approved-model'], input: { messages: [] } }),
    /BudgetLedger/
  );
  assert.equal(requests.length, 1);
});

test('budget cap blocks further spend before it is recorded', () => {
  const ledger = new BudgetLedger({ globalDailyCapUsd: 1, siteMonthlyCapUsd: 1, articleCapUsd: 0.5 });
  ledger.record({ siteId: 'circuits-at-home', contentId: 'support-1', costUsd: 0.5, taskType: 'support_draft' });
  assert.deepEqual(ledger.canSpend({ siteId: 'circuits-at-home', contentId: 'support-1', estimatedUsd: 0.01 }), { allowed: false, reason: 'article_cap' });
  assert.throws(() => ledger.record({ siteId: 'circuits-at-home', contentId: 'support-1', costUsd: 0.01, taskType: 'support_draft' }), /article_cap/);
});

test('usage summary groups spend by the route used', () => {
  const summary = summarizeUsage([
    { siteId: 'circuits-at-home', contentId: 'a', taskType: 'research', model: 'model-a', provider: 'mock', costUsd: 0 },
    { siteId: 'circuits-at-home', contentId: 'b', taskType: 'research', model: 'model-a', provider: 'mock', costUsd: 0 },
    { siteId: 'other-site', contentId: 'c', taskType: 'draft', model: 'model-b', provider: 'openrouter', costUsd: 0.12 }
  ]);
  assert.equal(summary.total_requests, 3);
  assert.equal(summary.total_cost_usd, 0.12);
  assert.deepEqual(summary.by_route[0], { site_id: 'other-site', task_type: 'draft', model: 'model-b', provider: 'openrouter', requests: 1, cost_usd: 0.12 });
});

test('workflow blocks gated state changes without approval and resumes from correction state', () => {
  let job = { id: 'batch-1', state: 'site_onboarded', history: [] };
  job = transition(job, 'inventory_ready', { actor: 'inventory-adapter' });
  job = transition(job, 'research_ready', { actor: 'research-worker' });
  job = transition(job, 'strategy_proposed', { actor: 'strategy-worker' });
  assert.throws(() => transition(job, 'strategy_approved', { actor: 'owner' }), /requires recorded human approval/);
  job = transition(job, 'strategy_approved', { actor: 'owner', approval: true });
  const corrected = retryFrom({ ...job, state: 'qa_passed' }, 'drafted', { actor: 'reviewer', reason: 'citation required' });
  assert.equal(corrected.state, 'drafted');
  assert.equal(corrected.history.at(-1).retry, true);
});

test('offline batch completes to scheduled without live provider calls or duplicate schedule events', async () => {
  const policy = loadRoutingPolicy(await readJson('config/model-routing.example.json'));
  const provider = new MockOpenRouterProvider();
  const route = selectMockRoute(policy, 'research_extraction');
  const result = await provider.complete({ taskType: 'research_extraction', input: { content_id: 'circuits-001' }, route });
  assert.equal(result.usage.cost_usd, 0);

  let job = { id: 'circuits-001', state: 'site_onboarded', history: [] };
  const approvalStates = new Set(['strategy_approved', 'approved', 'scheduled']);
  for (const state of [
    'inventory_ready', 'research_ready', 'strategy_proposed', 'strategy_approved',
    'plan_exported', 'plan_imported_or_approved', 'batch_queued', 'researching',
    'drafted', 'visuals_ready', 'qa_passed', 'human_review', 'approved', 'staged', 'scheduled'
  ]) {
    job = transition(job, state, { actor: approvalStates.has(state) ? 'owner' : 'offline-worker', approval: approvalStates.has(state) });
  }
  assert.equal(job.state, 'scheduled');
  assert.equal(job.history.filter((event) => event.to === 'scheduled').length, 1);
  assert.throws(() => transition(job, 'scheduled', { actor: 'offline-worker', approval: true }), /Invalid transition/);
});

test('workbook import preview rejects malformed rows and existing URL collisions before persistence', () => {
  const result = validatePlanRows([
    {
      stable_content_id: 'circuits-support-001', site_id: 'circuits-at-home', cluster_id: 'multimeters',
      title: 'How to choose a multimeter', primary_query: 'how to choose a multimeter', intent: 'informational',
      type: 'supporting_article', slug: 'how-to-choose-a-multimeter', proposed_url: 'https://circuitsathome.com/how-to-choose-a-multimeter',
      action: 'NEW', target_core_id: 'core-multimeters', priority: 'high', evidence_status: 'verified',
      review_tier: 'standard', status: 'planned', scheduled_for: '2026-10-15'
    },
    {
      stable_content_id: 'circuits-support-001', site_id: 'circuits-at-home', cluster_id: 'multimeters',
      title: 'Duplicate', primary_query: 'duplicate', intent: 'informational', type: 'supporting_article',
      slug: 'how-to-choose-a-multimeter', proposed_url: 'https://circuitsathome.com/existing', action: 'NEW',
      target_core_id: 'not-approved', priority: 'low', evidence_status: 'partial', review_tier: 'light', status: 'planned', scheduled_for: 'not-a-date'
    }
  ], {
    siteId: 'circuits-at-home', knownCoreIds: ['core-multimeters'],
    existingInventory: [{ canonical_url: 'https://circuitsathome.com/existing' }]
  });
  assert.equal(result.valid, false);
  assert.deepEqual(result.errors.map((error) => error.code), [
    'duplicate_content_id', 'duplicate_slug', 'existing_url_collision', 'unknown_core_id', 'invalid_schedule_date'
  ]);
  assert.deepEqual(result.changes.map((change) => change.outcome), ['preview_only', 'blocked']);
});

test('high-impact claims without citations are blocked and safety-sensitive work receives expert review', () => {
  const evidence = validateEvidencePack({
    checkedAt: '2026-10-08',
    claims: [{
      text: 'This meter has a CAT III rating.', class: 'verified_fact', impact: 'high',
      confidence: 95, source_type: 'manufacturer_manual', checked_at: '2026-10-08'
    }]
  });
  assert.equal(evidence.publishable, false);
  assert.deepEqual(evidence.reviewTriggers, [{ claim: 1, reason: 'high_impact_claim_missing_citation', blocking: true }]);
  assert.deepEqual(calculateRiskBand({ commercial: 3, technical: 3, uncertainty: 2, visual: 3, change: 1 }), {
    total: 12, band: 'critical', requiredReview: 'owner_or_domain_expert'
  });
});

test('CSV export and import preserve values while rejecting malformed workbook input', () => {
  const csv = exportCsv([{ stable_content_id: 'circuits-1', title: 'Guide, with comma', notes: 'A "quoted" note' }], ['stable_content_id', 'title', 'notes']);
  assert.deepEqual(parseCsv(csv), [{ stable_content_id: 'circuits-1', title: 'Guide, with comma', notes: 'A "quoted" note' }]);
  assert.throws(() => parseCsv('title,notes\n"unclosed,value'), /unclosed quoted cell/);
  assert.throws(() => parseCsv('title,title\nA,B'), /duplicate headers/);
});

test('five-item batch runner is idempotent and resumes corrected work without duplicate jobs', () => {
  const runner = new BatchRunner({ batchId: 'circuits-batch-001', siteId: 'circuits-at-home' });
  const items = Array.from({ length: 5 }, (_, index) => ({ stable_content_id: `circuits-${index + 1}`, site_id: 'circuits-at-home' }));
  const queued = runner.enqueue(items, { actor: 'owner' });
  assert.equal(queued.length, 5);
  assert.equal(queued[0].state, 'batch_queued');
  assert.equal(runner.enqueue(items, { actor: 'owner' })[0].history.length, queued[0].history.length);
  assert.equal(runner.snapshot().length, 5);
  assert.throws(() => runner.enqueue([...items, { stable_content_id: 'circuits-6', site_id: 'circuits-at-home' }], { actor: 'owner' }), /1 to 5/);

  let job = runner.advance('circuits-1', 'researching', { actor: 'research-worker' });
  job = runner.advance('circuits-1', 'drafted', { actor: 'writer-worker' });
  job = runner.returnForCorrection('circuits-1', 'researching', { actor: 'reviewer', reason: 'source needed' });
  assert.equal(job.state, 'researching');
  assert.equal(runner.snapshot().filter((item) => item.id === 'circuits-1').length, 1);
});

test('batch runner requires a successful quality gate before QA can pass', () => {
  const runner = new BatchRunner({ batchId: 'circuits-batch-qa', siteId: 'circuits-at-home' });
  runner.enqueue([{ stable_content_id: 'circuits-qa-1', site_id: 'circuits-at-home' }], { actor: 'owner' });
  runner.advance('circuits-qa-1', 'researching', { actor: 'research-worker' });
  runner.advance('circuits-qa-1', 'drafted', { actor: 'writer-worker' });
  runner.advance('circuits-qa-1', 'visuals_ready', { actor: 'media-worker' });
  assert.throws(() => runner.advance('circuits-qa-1', 'qa_passed', { actor: 'qa-worker', qualityGate: { readyForHumanReview: false } }), /quality gate/);
  const job = runner.advance('circuits-qa-1', 'qa_passed', { actor: 'qa-worker', qualityGate: { readyForHumanReview: true } });
  assert.equal(job.state, 'qa_passed');
});

test('batch runner requires a structured human decision before approval or scheduling', () => {
  const runner = new BatchRunner({ batchId: 'circuits-batch-approval', siteId: 'circuits-at-home' });
  runner.enqueue([{ stable_content_id: 'circuits-approval-1', site_id: 'circuits-at-home' }], { actor: 'owner' });
  for (const state of ['researching', 'drafted', 'visuals_ready']) runner.advance('circuits-approval-1', state, { actor: 'worker' });
  runner.advance('circuits-approval-1', 'qa_passed', { actor: 'qa-worker', qualityGate: { readyForHumanReview: true } });
  runner.advance('circuits-approval-1', 'human_review', { actor: 'reviewer' });
  assert.throws(() => runner.advance('circuits-approval-1', 'approved', { actor: 'reviewer', approval: true }), /recorded approval decision/);
  const decision = createApprovalDecision({ contentId: 'circuits-approval-1', actor: 'reviewer', decision: 'approved', decidedAt: '2026-10-09T00:00:00Z' });
  const approved = runner.advance('circuits-approval-1', 'approved', { actor: 'reviewer', approvalDecision: decision });
  assert.equal(approved.state, 'approved');
  const staged = runner.advance('circuits-approval-1', 'staged', { actor: 'staging-worker' });
  const scheduled = runner.advance('circuits-approval-1', 'scheduled', { actor: 'reviewer', approvalDecision: decision });
  assert.equal(staged.state, 'staged');
  assert.equal(scheduled.state, 'scheduled');
  assert.throws(() => createApprovalDecision({ contentId: 'circuits-approval-1', actor: 'reviewer', decision: 'returned' }), /requires a reason/);
});

test('media manifest blocks generated exact product imagery and queues technical graphics for review', () => {
  const manifest = validateMediaManifest({
    content_id: 'circuits-1',
    assets: [
      { asset_id: 'asset-1', type: 'wiring_diagram', origin: 'original', rights_note: 'Created from approved research.', alt_text: 'Multimeter probe placement diagram.' },
      { asset_id: 'asset-2', type: 'product_image', origin: 'generated', exact_product_representation: true, rights_note: 'Generated test asset.', alt_text: 'Product image.' }
    ]
  });
  assert.equal(manifest.valid, false);
  assert.deepEqual(manifest.errors, [{ asset: 2, code: 'generated_exact_product_prohibited' }]);
  assert.deepEqual(manifest.reviewQueue, [
    { asset: 1, asset_id: 'asset-1', reason: 'mandatory_human_visual_review' },
    { asset: 2, asset_id: 'asset-2', reason: 'product_accuracy_review' }
  ]);
});
