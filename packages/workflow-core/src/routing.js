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
