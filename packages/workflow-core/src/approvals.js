const decisions = new Set(['approved', 'returned']);

export function createApprovalDecision({ contentId, actor, decision, reason = '', decidedAt = new Date().toISOString() } = {}) {
  if (!contentId || !actor) throw new Error('contentId and actor are required for an approval decision');
  if (!decisions.has(decision)) throw new Error('Approval decision must be approved or returned');
  if (decision === 'returned' && !String(reason).trim()) throw new Error('A returned decision requires a reason');
  if (Number.isNaN(Date.parse(decidedAt))) throw new Error('Approval decision date is invalid');
  return { content_id: contentId, actor, decision, reason: String(reason).trim(), decided_at: new Date(decidedAt).toISOString() };
}

export function isApprovedForContent(approvalDecision, contentId) {
  return approvalDecision?.content_id === contentId && approvalDecision?.decision === 'approved' && Boolean(approvalDecision?.actor) && !Number.isNaN(Date.parse(approvalDecision?.decided_at));
}
