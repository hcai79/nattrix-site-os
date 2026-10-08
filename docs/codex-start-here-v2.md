# Codex Start Here: Nattrix Site OS 2.0

## Start here
1. AGENTS.md
2. docs/architecture-v2.md
3. docs/milestones/vertical-slice-v0.1.md
4. docs/openrouter/model-routing.md
5. docs/automation/end-to-end-pilot.md
6. docs/editorial/workflow.md
7. docs/development/definition-of-done.md

## First PR
Build a small reproducible vertical slice: normalized Site Blueprint, mock site adapter and URL inventory, mocked OpenRouter adapter, model-routing policy loader, budget/telemetry gates, and end-to-end workflow state machine tests.

## Next PRs
1. Research evidence store and competitor pack
2. Spreadsheet export/import with collision handling
3. Draft and visual manifest generation
4. WordPress Gutenberg staging integration and human review
5. GSC/GA4 and monetization inputs, experiment engine

## Notes
Do not auto-select live OpenRouter model names until the registry is fetched and benchmarked. No hardcoded vendor tokens, provider secrets or site passwords. No live paid requests in CI. Do not deploy to production.
