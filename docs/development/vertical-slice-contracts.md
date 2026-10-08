# Vertical Slice Contracts

`packages/workflow-core` is the first offline-safe implementation for Vertical Slice v0.1. It provides testable contract boundaries while the dashboard, database, n8n workflows, and WordPress staging integration remain deliberately unconnected.

## Included boundaries

- Site Blueprint validation and a CircuitsAtHome seed configuration.
- A read-only inventory normalizer that rejects off-domain URLs and canonical collisions.
- A routing-policy loader that preserves empty model allowlists until a live registry has been evaluated and approved.
- A deterministic mock OpenRouter provider. It cannot make paid requests or read `OPENROUTER_API_KEY`.
- Pre-spend global, per-site, and per-content budget checks with telemetry records.
- A sequential workflow state machine with audit history, required human approval gates, and explicit correction retries.

## Deliberately deferred

- Registry retrieval, benchmark-driven model promotion, and the server-only live OpenRouter adapter.
- Evidence persistence, workbook import/export, draft generation, media processing, dashboard UI, WordPress staging, scheduling, and production publishing.
- Any production site read or write.

## Local verification

Run `npm test`. The tests are deterministic and do not require credentials, network access, a WordPress installation, or a paid API call.

## Design decisions

`workflow-core` uses standard Node.js modules only so the early contract tests can run without a package install. The expected future runtime boundary is server-only: it can add a live adapter beside the mock provider, but the test path must remain mock-only and must never expose `OPENROUTER_API_KEY` to a browser or content prompt.
