# Evidence ledger template

Use this template before proposing a refresh, commercial recommendation, factual graphic, or technical claim. It records evidence. It does not approve a change or authorize publication.

## Document control

| Field | Value |
| --- | --- |
| Site ID | `site-id` |
| Content ID | `content-id` |
| URL under review | `https://example.com/page/` |
| Audit date | `YYYY-MM-DD` |
| Reviewer | `name or role` |
| Status | `partial`, `complete`, or `blocked` |

## Claim ledger

Create one row per factual statement. Do not combine price, capability, rights, policy, or test-result claims in one row.

| Claim ID | Claim text | Class | Impact | Confidence | Source URL | Source type | Checked at | Contextual notes | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `claim-001` | Exact claim, written without added interpretation. | `verified_fact`, `manufacturer_claim`, `editorial_assessment`, or `unresolved` | `low`, `medium`, or `high` | `0-100` | `https://...` | `first_party`, `official_documentation`, `manufacturer_manual`, or other named source | ISO 8601 timestamp | Explain scope, plan, region, prerequisites, contradictory evidence, and how the claim can safely be used. | `retained`, `reframe`, `remove`, or `unresolved` |

## Conflicts and gaps

| Claim ID or area | Conflict or missing evidence | Required resolution | Owner decision needed? |
| --- | --- | --- | --- |
| `claim-001` | Describe the disagreement or missing source. | Capture an official source, test in staging, or remove the statement. | `yes` or `no` |

## Staging-brief boundary

Only after every high-impact claim has a valid source and contextual note:

1. List the exact existing blocks to preserve.
2. List proposed evidence-supported replacements.
3. List claims that must be removed or marked unresolved.
4. Request human approval for commercial Core pages, safety-sensitive material, or any major modification.

## Guardrails

- Do not invent source URLs, exact quotes, test results, prices, or policy language.
- Record a first-party source separately from editorial judgment.
- Preserve URLs, canonicals, redirects, taxonomy paths, affiliate treatment, and global styling unless separately approved.
- A ledger is incomplete when a claim is unresolved. It is never a substitute for human approval.
