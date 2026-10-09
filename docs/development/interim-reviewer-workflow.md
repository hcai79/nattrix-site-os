# Interim Reviewer Workflow

Use this workflow until a dedicated human-review interface is approved and built. It gives a reviewer a small, auditable decision record without granting an automation permission to schedule or publish.

## Scope

This workflow applies to a draft that has passed the offline draft QA gate. It does not authorize:

- production publication or production WordPress writes
- Core commercial page publication or major edits
- a redirect, URL, canonical, taxonomy, affiliate-ID, navigation, or global-style change
- acceptance of uncited high-impact claims or unverified technical visuals

The WordPress adapter additionally requires a staging environment, an explicit runtime write opt-in, an idempotency key, and a recorded human approval before it can schedule a draft.

## Reviewer packet

For each `content_id`, assemble one packet containing:

1. The current draft and Gutenberg-block preview.
2. The research artifact, source URLs, retrieval dates, and explicit assumptions.
3. Claim-evidence and media-manifest QA results, including every review trigger.
4. The proposed target URL, collision-preview result, and whether it matches an existing URL.
5. The model-usage and cost record, if a model was used.
6. The requested staging action: keep as draft, return for correction, or schedule.

Do not treat a green automated QA result as a publication approval. It only makes the draft eligible for human review.

## Decision record

Record one structured decision per reviewed draft. The record must match the `createApprovalDecision` contract:

```json
{
  "content_id": "cah-support-001",
  "decision": "approve",
  "actor": "reviewer@example.com",
  "actor_type": "human",
  "decided_at": "2026-10-09T17:00:00.000Z",
  "note": "Evidence and preview checked. Approved for staging schedule only."
}
```

Allowed `decision` values are `approve` and `return`. A `return` record must include a specific reason. The actor type must be `human`; service accounts and agents cannot satisfy this gate.

Store the decision with the draft's audit records. In the TechVideoBlog Operations Hub, the VA Queue can hold the task and evidence link, but the structured decision remains the workflow authorization record.

## Review outcomes

| Outcome | Required record | Next workflow action |
| --- | --- | --- |
| Return for correction | `decision: return` plus a specific reason | Create a correction task and resume from the appropriate state. Preserve the prior version. |
| Approve for staging draft | `decision: approve` | The authorized staging worker may create or retain a WordPress draft. |
| Approve for staging schedule | `decision: approve`, plus the approved future timestamp and staging post ID | The authorized staging worker may schedule that existing staging draft once. |
| Production publish or material commercial change | Separate owner approval | Stop this workflow and use the relevant production approval process. |

## Reviewer checklist

- Confirm the site ID, content ID, and intended environment.
- Confirm the URL plan has no unresolved collision or protected-route issue.
- Open each cited source and check its retrieval date and claim fit.
- Check that important claims, prices, product details, and comparison conclusions have appropriate evidence.
- Check visuals for provenance, rights notes, alt text, and any required technical/product review.
- Check the rendered preview for headings, links, disclosure placement, and no affiliate URL embedded in article content.
- Confirm the requested action is staging-only and has an idempotency key.
- Record an approve or return decision with the human reviewer's identity and timestamp.

## Audit and rollback

Keep the previous state, reviewer decision, requested action, idempotency key, and WordPress post ID together. A rejected or failed staging action must not be retried with a new content identity. Correct it, preserve the evidence trail, and resume the same job. If staging validation fails, follow the [Portfolio Engine staging validation runbook](portfolio-engine-staging-validation.md); do not use this workflow to bypass it.
