export function loadRoutingPolicy(policy) {
  if (!policy || policy.version !== 1) throw new Error('Unsupported routing policy version');
  if (!Number.isFinite(policy.daily_usd_cap_global) || !Number.isFinite(policy.per_article_usd_cap)) throw new Error('Routing policy needs numeric spend caps');
  if (!policy.task_tiers || !policy.allowed_models_by_tier) throw new Error('Routing policy needs task tiers and model allowlists');
  return structuredClone(policy);
}

export function selectMockRoute(policy, taskType) {
  const task = policy.task_tiers[taskType];
  if (!task) throw new Error(`Unknown task type: ${taskType}`);
  return { taskType, tier: task.tier, provider: 'mock', model: 'deterministic-fixture', live: false };
}

export class BudgetLedger {
  constructor({ globalDailyCapUsd, siteMonthlyCapUsd, articleCapUsd }) {
    this.caps = { globalDailyCapUsd, siteMonthlyCapUsd, articleCapUsd };
    this.entries = [];
  }

  canSpend({ siteId, contentId, estimatedUsd }) {
    if (!Number.isFinite(estimatedUsd) || estimatedUsd < 0) return { allowed: false, reason: 'invalid_estimate' };
    const spendFor = (predicate) => this.entries.filter(predicate).reduce((total, entry) => total + entry.costUsd, 0);
    const today = new Date().toISOString().slice(0, 10);
    if (spendFor((entry) => entry.date === today) + estimatedUsd > this.caps.globalDailyCapUsd) return { allowed: false, reason: 'global_daily_cap' };
    if (spendFor((entry) => entry.siteId === siteId && entry.month === today.slice(0, 7)) + estimatedUsd > this.caps.siteMonthlyCapUsd) return { allowed: false, reason: 'site_monthly_cap' };
    if (spendFor((entry) => entry.contentId === contentId) + estimatedUsd > this.caps.articleCapUsd) return { allowed: false, reason: 'article_cap' };
    return { allowed: true };
  }

  record({ siteId, contentId, costUsd, taskType, model = 'deterministic-fixture' }) {
    const allowed = this.canSpend({ siteId, contentId, estimatedUsd: costUsd });
    if (!allowed.allowed) throw new Error(`Budget blocked: ${allowed.reason}`);
    const now = new Date();
    const entry = { siteId, contentId, costUsd, taskType, model, provider: 'mock', date: now.toISOString().slice(0, 10), month: now.toISOString().slice(0, 7), recorded_at: now.toISOString() };
    this.entries.push(entry);
    return entry;
  }
}

export class MockOpenRouterProvider {
  constructor(fixtures = {}) { this.fixtures = fixtures; }

  async complete({ taskType, input, route }) {
    if (route.provider !== 'mock') throw new Error('Live providers are not enabled in the offline vertical slice');
    const fixture = this.fixtures[taskType] ?? { output: { accepted: true }, usage: { input_tokens: 0, output_tokens: 0, cost_usd: 0 } };
    return { output: structuredClone(fixture.output), usage: structuredClone(fixture.usage), telemetry: { task_type: taskType, model: route.model, provider: 'mock', input_bytes: JSON.stringify(input).length } };
  }
}

export class OpenRouterProvider {
  constructor({ apiKey, fetchImpl = globalThis.fetch, allowPaidRequests = false }) {
    if (!allowPaidRequests) throw new Error('Live OpenRouter requests require explicit allowPaidRequests=true');
    if (!apiKey) throw new Error('OPENROUTER_API_KEY is required for the live provider');
    if (typeof fetchImpl !== 'function') throw new Error('A fetch implementation is required for the live provider');
    this.apiKey = apiKey;
    this.fetchImpl = fetchImpl;
  }

  async complete({ taskType, input, model, allowedModels, maxOutputTokens = 800, budgetLedger, siteId, contentId, estimatedCostUsd }) {
    if (!allowedModels.includes(model)) throw new Error(`Model is not allowlisted for ${taskType}`);
    if (!(budgetLedger instanceof BudgetLedger)) throw new Error('A BudgetLedger is required for live provider requests');
    const preflight = budgetLedger.canSpend({ siteId, contentId, estimatedUsd: estimatedCostUsd });
    if (!preflight.allowed) throw new Error(`Budget blocked: ${preflight.reason}`);
    const reservation = budgetLedger.record({ siteId, contentId, costUsd: estimatedCostUsd, taskType, model });
    const response = await this.fetchImpl('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages: input.messages,
        max_tokens: maxOutputTokens
      })
    });
    if (!response.ok) throw new Error(`OpenRouter request failed with HTTP ${response.status}`);
    const body = await response.json();
    return {
      output: body.choices?.[0]?.message?.content ?? '',
      usage: {
        input_tokens: body.usage?.prompt_tokens ?? 0,
        output_tokens: body.usage?.completion_tokens ?? 0,
        cost_usd: body.usage?.cost ?? 0
      },
      telemetry: {
        task_type: taskType,
        model: body.model ?? model,
        provider: 'openrouter',
        estimated_cost_usd: reservation.costUsd,
        reported_cost_usd: body.usage?.cost ?? null
      }
    };
  }
}
