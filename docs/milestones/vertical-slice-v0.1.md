# Milestone: Vertical Research -> Plan -> Five Finished Drafts (v0.1)

This milestone becomes the next integrated delivery goal. The Portfolio Engine WordPress interface remains a prerequisite but must be minimal; avoid building all directory features before testing this end-to-end loop.

## Deliverables
1. Site Blueprint schema and CircuitsAtHome seed config
2. Content/competitor/URL inventory and evidence schema
3. OpenRouter gateway with task routing, allowlist, budget enforcement, telemetry and mock provider for tests
4. Research workflows using grounded inputs and audit logs
5. XLSX/CSV export and validated import with dedup/collision preview
6. Five-item batch runner with idempotent resumable state machine
7. Gutenberg renderers for approved site templates; images/media manifest
8. Separate QA pass, risk bands, human approval screen (minimal interface acceptable)
9. Staging WP draft/schedule integration with no production side effects
10. Basic cost/performance reporting and repeatable fixture tests

## Acceptance
A mocked offline integration test completes all states through scheduled; failures retry without duplicate posts; malformed workbook row rejected; missing citations block high-impact claims; hard spending limits halt requests; no secrets/client data exposed. A live staging trial is optional until staging access is provided.

## Sequence
A. contracts + mocked adapters; B. OpenRouter gateway and evaluation harness; C. research + workbook; D. writing/media QA; E. WP staging and approvals; F. analytics and feedback.

## Explicitly out of scope
Full multi-site rollout, automatic production publishing before sign-off, unattended ranked-page rewrites, actual affiliate payout reconciliation, autonomous creation of fact-sensitive diagrams.
