# Vertical Slice Contracts

`packages/workflow-core` is the first offline-safe implementation for Vertical Slice v0.1. It provides testable contract boundaries while the dashboard, database, n8n workflows, and WordPress staging integration remain deliberately unconnected.

## Included boundaries

- Site Blueprint validation and a CircuitsAtHome seed configuration.
- A read-only inventory normalizer that rejects off-domain URLs and canonical collisions.
- A routing-policy loader that preserves empty model allowlists until a live registry has been evaluated and approved.
- A deterministic mock OpenRouter provider. It cannot make paid requests or read `OPENROUTER_API_KEY`.
- A server-only OpenRouter adapter that is disabled unless a caller explicitly enables paid requests and supplies an allowlisted model. Empty allowlists in the starter policy keep all live model requests blocked.
- Pre-spend global, per-site, and per-content budget checks with telemetry records.
- A sequential workflow state machine with audit history, required human approval gates, and explicit correction retries.
- Workbook-row validation that rejects duplicate content IDs, duplicate slugs, unapproved core relations, malformed dates, and `NEW` URL collisions before any state is saved.
- A dependency-free CSV serializer and parser that preserve quoted values and reject malformed rows before validation.
- A five-item maximum batch runner with stable content IDs, idempotent re-queueing, and auditable return-to-correction behavior.
- Research evidence validation that blocks high-impact claims without a valid source URL and uses documented risk dimensions to set review depth.

## Deliberately deferred

- Registry retrieval, benchmark-driven model promotion, and the server-only live OpenRouter adapter.
- XLSX-specific file adapters, evidence persistence, draft generation, media processing, dashboard UI, WordPress staging, scheduling, and production publishing.
- Any production site read or write.

## Local verification

Run `npm test`. The tests are deterministic and do not require credentials, network access, a WordPress installation, or a paid API call.

## Design decisions

`workflow-core` uses standard Node.js modules only so the early contract tests can run without a package install. The expected future runtime boundary is server-only: it can add a live adapter beside the mock provider, but the test path must remain mock-only and must never expose `OPENROUTER_API_KEY` to a browser or content prompt.

## Execution routing

Codex is used for repository work, tests, documentation, and interactive development under the owner's Codex subscription. It is not embedded as a background production model provider. OpenRouter is reserved for approved server-side runtime tasks after the model registry, fixed evaluation set, allowlist, budget, and privacy controls are complete. An OpenRouter key in local `.env` alone does not enable requests.
