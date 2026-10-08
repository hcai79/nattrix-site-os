const states = [
  'site_onboarded', 'inventory_ready', 'research_ready', 'strategy_proposed', 'strategy_approved',
  'plan_exported', 'plan_imported_or_approved', 'batch_queued', 'researching', 'drafted',
  'visuals_ready', 'qa_passed', 'human_review', 'approved', 'staged', 'scheduled', 'published', 'observed'
];

const gatedStates = new Set(['strategy_approved', 'approved', 'scheduled', 'published']);

export function transition(job, nextState, { actor, approval = false } = {}) {
  const currentIndex = states.indexOf(job.state);
  const nextIndex = states.indexOf(nextState);
  if (currentIndex < 0 || nextIndex < 0) throw new Error('Unknown workflow state');
  if (nextIndex !== currentIndex + 1) throw new Error(`Invalid transition from ${job.state} to ${nextState}`);
  if (gatedStates.has(nextState) && !approval) throw new Error(`${nextState} requires recorded human approval`);
  if (!actor) throw new Error('Transition actor is required');
  return { ...job, state: nextState, history: [...(job.history ?? []), { from: job.state, to: nextState, actor, approved: approval, at: new Date().toISOString() }] };
}

export function retryFrom(job, state, { actor, reason } = {}) {
  if (!states.includes(state) || !actor || !reason) throw new Error('Retry needs a valid state, actor, and reason');
  return { ...job, state, history: [...(job.history ?? []), { from: job.state, to: state, actor, reason, retry: true, at: new Date().toISOString() }] };
}

export { states };
