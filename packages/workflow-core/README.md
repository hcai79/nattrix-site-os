# Workflow Core

Offline-safe, dependency-free JavaScript contracts for the Vertical Slice v0.1. This package is deliberately not a production orchestrator and never reads credentials, makes network calls, or publishes to WordPress.

## Interfaces

- `validateSiteBlueprint(blueprint)` checks the minimum reusable site configuration contract.
- `buildUrlInventory(records, siteDomain)` normalizes same-domain canonical URLs and rejects collisions.
- `loadRoutingPolicy(policy)` validates a versioned routing-policy shape.
- `selectMockRoute(policy, taskType)` returns the deterministic mock route used by tests.
- `BudgetLedger` applies global daily, site monthly, and per-content cost caps before recording telemetry.
- `MockOpenRouterProvider` returns injected fixtures only. It rejects live routing.
- `OpenRouterProvider` is a server-only, explicitly enabled adapter. It enforces a supplied model allowlist and requires a `BudgetLedger` preflight before every request, but is not wired into the workflow until the registry and evaluation gate are complete.
- `transition(job, nextState, options)` implements the documented workflow sequence and records approval gates.
- `retryFrom(job, state, options)` creates an auditable, resumable correction transition without duplicate publishing behavior.
- `validatePlanRows(rows, context)` validates editable workbook rows and produces a non-persisting collision and evidence preview.
- `validateEvidencePack(pack)` blocks uncited high-impact claims and identifies human-review triggers.
- `calculateRiskBand(dimensions)` maps documented risk dimensions to a required review depth.
- `exportCsv(rows, columns)` and `parseCsv(csv)` enable a dependency-free, round-trip-safe CSV boundary before workbook file adapters are introduced.
- `BatchRunner` queues no more than five unique items, preserves job identity, and supports auditable correction/resume behavior without publishing.
- `validateMediaManifest(manifest)` records media provenance, rejects generated exact-product imagery, and identifies visuals requiring human review.
- `MockSiteAdapter` provides a deterministic, read-only site inventory fixture and rejects any draft creation call.
- `renderGutenbergDraft` turns a validated structured draft into basic Gutenberg blocks without injecting affiliate URLs.
- `StagingWordPressAdapter` can create a WordPress **draft only** after an explicit staging-only write opt-in. It does not store credentials and rejects production or unspecified environments. A durable idempotency store must be supplied by a real worker deployment.
- `validateDraftPackage` runs the Gutenberg, evidence, and media gates together and prepares an item for human review. It never approves or publishes content.

## Security boundary

The package does not read `.env` or expose a browser configuration. A server-only caller may pass `process.env.OPENROUTER_API_KEY` to `OpenRouterProvider` only after the registry and evaluation gate is complete. The mock path remains mandatory for tests and CI. Production publishing and staging integration are intentionally outside this package.

## Run tests

```powershell
npm test
```
