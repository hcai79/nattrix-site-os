# Workflow Core

Offline-safe, dependency-free JavaScript contracts for the Vertical Slice v0.1. This package is deliberately not a production orchestrator and never reads credentials, makes network calls, or publishes to WordPress.

## Interfaces

- `validateSiteBlueprint(blueprint)` checks the minimum reusable site configuration contract.
- `buildUrlInventory(records, siteDomain)` normalizes same-domain canonical URLs and rejects collisions.
- `loadRoutingPolicy(policy)` validates a versioned routing-policy shape.
- `selectMockRoute(policy, taskType)` returns the deterministic mock route used by tests.
- `BudgetLedger` applies global daily, site monthly, and per-content cost caps before recording telemetry.
- `MockOpenRouterProvider` returns injected fixtures only. It rejects live routing.
- `transition(job, nextState, options)` implements the documented workflow sequence and records approval gates.
- `retryFrom(job, state, options)` creates an auditable, resumable correction transition without duplicate publishing behavior.

## Security boundary

The package accepts no API key and has no live provider. A future server-only OpenRouter adapter may consume `OPENROUTER_API_KEY`, but must keep the mock path as the default for tests and CI. Production publishing and staging integration are intentionally outside this package.

## Run tests

```powershell
npm test
```
