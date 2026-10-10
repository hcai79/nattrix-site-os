# TechVideoBlog Owner Decision Register

This register collects only decisions that cannot be safely inferred from the repository or a read-only site audit. It is not permission to change production. Once a decision is recorded, prepare a narrow change brief, verify it on staging where available, and obtain the required production approval.

## Open decisions

| ID | Priority | Decision needed | Why an owner must decide | Safe work already completed | Owner response needed |
| --- | --- | --- | --- | --- | --- |
| TVB-004 | P0 | Select the intended canonical route and redirect approach for the Captions AI Review. | The public path `/tools/captions-ai-review/` redirects to `/tools/captions-ai-review-2/`, which returns 404. Any repair can affect indexed URLs, backlinks, redirects, and canonical behavior. | Redirect chain documented, affected Core 40 sources identified, and no live link was changed. | Choose one: restore the intended existing path, select a different final canonical route with a permanent legacy redirect, or defer all routing work. |
| TVB-003 | P0 | Confirm the intended destination for a link in Video Stabilization AI, post 1292. | The anchor is labeled as a TechVideoBlog directory but currently leads to an unrelated external site. Repointing it without intent could misrepresent a recommendation or change a commercial relationship. | The issue is recorded as an escalation. No outbound link was changed. | Supply the intended internal URL, approve removal, or confirm that the external destination and its anchor text are intentional. |

## Decision response format

For each ID, record:

1. The selected option.
2. The final intended URL, if the decision concerns a link or route.
3. Whether a staging verification is required before production.
4. Any backlink, SEO, affiliate, or commercial constraint that must be preserved.
5. The approver and decision date.

## Decisions that remain intentionally deferred

- Changing any Core 40 page title, body, pricing, recommendation, affiliate treatment, or metadata after an evidence pack is complete still requires page-specific human approval.
- The Portfolio Engine plugin remains staging-only until a non-production endpoint and least-privilege account are available.
- OpenRouter live use remains disabled until task-specific model quality, safety, and cost evaluation establishes allowlists.

## References

- [Captions AI routing decision record](audits/2026-10-09-captions-ai-routing-decision.md)
- [AI content QA workflow](ai-content-qa-workflow.md)
- [Tool Review QA Scorecard](tool-review-qa-scorecard.md)
