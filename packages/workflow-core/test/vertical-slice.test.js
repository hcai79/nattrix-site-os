import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  validateSiteBlueprint, buildUrlInventory, loadRoutingPolicy, selectMockRoute,
  BudgetLedger, MockOpenRouterProvider, transition, retryFrom
} from '../src/index.js';

const root = new URL('../../../', import.meta.url);
const readJson = async (path) => JSON.parse(await readFile(new URL(path, root), 'utf8'));

test('CircuitsAtHome blueprint meets the shared contract', async () => {
  const blueprint = await readJson('sites/circuitsathome/site-blueprint.json');
  assert.deepEqual(validateSiteBlueprint(blueprint), { valid: true, errors: [] });
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

test('budget cap blocks further spend before it is recorded', () => {
  const ledger = new BudgetLedger({ globalDailyCapUsd: 1, siteMonthlyCapUsd: 1, articleCapUsd: 0.5 });
  ledger.record({ siteId: 'circuits-at-home', contentId: 'support-1', costUsd: 0.5, taskType: 'support_draft' });
  assert.deepEqual(ledger.canSpend({ siteId: 'circuits-at-home', contentId: 'support-1', estimatedUsd: 0.01 }), { allowed: false, reason: 'article_cap' });
  assert.throws(() => ledger.record({ siteId: 'circuits-at-home', contentId: 'support-1', costUsd: 0.01, taskType: 'support_draft' }), /article_cap/);
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
