# Vertical Slice v0.1 Implementation Status

Status date: 2026-10-10  
Branch: `codex/vertical-slice-contracts`

## Delivered offline contracts

| Milestone deliverable | Current implementation | Status |
| --- | --- | --- |
| Site Blueprint and seed config | Validated Site Blueprint contract and CircuitsAtHome seed | Complete offline |
| URL and workbook safety | Canonical inventory normalization, collision detection, CSV round trip, plan preview validation | Complete offline |
| Model gateway | Mock-by-default OpenRouter adapter, model allowlists, explicit paid opt-in, budget ledger, route-level usage summary, and deterministic cost-per-accepted-result scoring | Complete offline |
| Five-item execution | Bounded, idempotent batch runner with correction-state resume, draft QA gate, and structured approve-or-return records | Complete offline |
| Evidence and risk gates | Claim evidence validation, contextual notes, risk bands, and review triggers | Complete offline |
| Media policy | Provenance validation and human-review queue for technical or product-sensitive visuals | Complete offline |
| Draft rendering and QA | Basic Gutenberg renderer plus combined draft, evidence, and media QA gate that is required before `qa_passed` | Complete offline |
| WordPress handoff | Read-only mock adapter plus staging-only draft and scheduling adapters, each with explicit runtime authorization, idempotency, and approval guards | Contract complete |
| Portfolio Engine prerequisite | Product model, taxonomies, Core Page controls, Affiliate Offer model and protected admin editor, REST namespace, settings, and static tests | Staging validation required |

## Verified acceptance evidence

The offline suite currently has 28 passing checks. It covers no-live-provider defaults, spending caps and usage reporting, deterministic model-evaluation scoring, malformed workbook rows, URL collisions, source-attributed research, evidence notes and uncited high-impact claims, restricted media types, duplicate scheduling prevention, mandatory draft QA, structured human approvals, Gutenberg rendering, staging-only draft and scheduling restrictions, and Portfolio Engine capability and input contracts.

## Still blocked by environment or owner decisions

1. **PHP and WordPress integration tests:** this workspace does not have a PHP or WordPress runtime. The plugin has static contract coverage only until it is installed on a staging clone.
2. **Staging endpoint and least-privilege account:** required to exercise the staging draft adapter and Portfolio Engine activation runbook.
3. **Approved five-item batch:** required before a real pilot can move past offline fixtures. The batch should use CircuitsAtHome first under the current architecture.
4. **Model evaluation results:** OpenRouter remains disabled until task-specific quality, safety, and cost results define an allowlist. No live paid request has been sent.
5. **Human-review interface:** the contracts expose review gates, and the [interim reviewer workflow](../development/interim-reviewer-workflow.md) documents the minimal auditable process. A dashboard is intentionally deferred.

## Explicit non-goals still respected

- No production WordPress write or publication
- No Supabase, n8n, GSC, dashboard, or AI-publishing implementation
- No stored credentials or live OpenRouter usage
- No automated commercial-page changes

## Recommended next gate

Provide a non-production WordPress staging URL and least-privilege integration account. Then run the [Portfolio Engine staging validation](../development/portfolio-engine-staging-validation.md), activate only on staging, and execute one approved mock-to-staging draft before selecting the real five-item pilot.
