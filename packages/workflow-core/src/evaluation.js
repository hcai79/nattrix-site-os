export function scoreModelEvaluation({ taskType, results }) {
  if (!taskType || !Array.isArray(results) || results.length === 0) throw new Error('Evaluation needs a taskType and at least one result');
  const byModel = new Map();
  for (const result of results) {
    if (!result?.model || typeof result.accepted !== 'boolean' || !Number.isFinite(result.cost_usd) || result.cost_usd < 0) {
      throw new Error('Each evaluation result needs model, accepted, and non-negative cost_usd');
    }
    const entry = byModel.get(result.model) ?? { model: result.model, attempts: 0, accepted: 0, total_cost_usd: 0 };
    entry.attempts += 1;
    entry.accepted += result.accepted ? 1 : 0;
    entry.total_cost_usd += result.cost_usd;
    byModel.set(result.model, entry);
  }
  return [...byModel.values()].map((entry) => ({
    ...entry,
    acceptance_rate: entry.accepted / entry.attempts,
    cost_per_accepted_result: entry.accepted ? entry.total_cost_usd / entry.accepted : null
  })).sort((a, b) => (a.cost_per_accepted_result ?? Infinity) - (b.cost_per_accepted_result ?? Infinity) || b.acceptance_rate - a.acceptance_rate);
}

export function selectEvaluationChampion(scores, { minimumAcceptanceRate }) {
  if (!Array.isArray(scores) || !Number.isFinite(minimumAcceptanceRate) || minimumAcceptanceRate < 0 || minimumAcceptanceRate > 1) {
    throw new Error('Champion selection needs scores and a 0-1 minimum acceptance rate');
  }
  const eligible = scores.filter((score) => score.acceptance_rate >= minimumAcceptanceRate && score.cost_per_accepted_result !== null);
  return eligible.length ? eligible[0] : null;
}
