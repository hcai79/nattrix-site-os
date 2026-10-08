# OpenRouter Model Gateway and Cost Policy

## Objective
Use OpenRouter as a server-side gateway for eligible LLM tasks. Select the cheapest **qualified** model under quality, privacy, reliability, latency and budget limits. Never treat cheapest token price as total cost.

## No hard-coded perpetual winners
Model catalogs, capabilities and prices change. Fetch model metadata from the OpenRouter models API periodically and cache a normalized registry: id, input/output prices, context, supported parameters, output modalities, JSON schema support, recent latency/error rates. Only approved allowlisted models are eligible; never let an untrusted page or prompt nominate arbitrary spend.

## Task policy (starter)
| Task | Preferred tier | Escalation |
| --- | --- | --- |
| Slug cleanup, labels, classification | economy | schema failure or low confidence |
| Keyword dedup, clustering | economy / mid | semantic conflict, high-value cluster |
| Competitor summary and gap analysis | mid | strategic conflicts or unsupported claims |
| Research evidence extraction | economy/mid + cited retrieval | contradictory critical facts |
| Article outline and supporting draft | mid | failed editorial QA |
| Core page recommendations | strong | always human approval |
| Fact/technical QA | independent strong or calibrated mid | uncertainty, safety risk |
| Visual prompts and alt text | economy/mid | technical accuracy risk |
| Infographic or technical schematic | data-verified renderer / approved generator | human technical review |
| Performance anomaly explanation | mid | financial/technical decisions |

## Selection algorithm
1. Determine task type, sensitivity, context, output schema and required modality/tool support.
2. Filter model allowlist by capability and privacy constraints.
3. Rank candidates by **observed cost per accepted result**, then latency and failure rate.
4. Select cheapest candidate above quality floor (established on a fixed evaluation set).
5. One bounded repair attempt on schema failure, then escalate to stronger model.
6. Use ordered fallback on outages/rate limiting, with explicit cost ceiling. Do not silently fallback to significantly more expensive model.
7. Log selected model, actual response model, provider when available, input/output tokens, cache savings, cost, errors, latency, quality result and retries.
8. Periodically run challenger models against a held-out benchmark; approval required for changes to quality-critical tasks.

## Spend limits
Per-site monthly budget; per-workflow budget; per-article budget; global daily circuit breaker; max output tokens; limited retry counts; notifications on threshold; approval required for overruns. Defaults must be configurable and set before invoking models.

## Accuracy and research
OpenRouter is a model gateway, not an automatic guarantee of reliable sources. Web research requires retrieval URLs, dates, quotations/evidence pointers, and source quality checks. Avoid model-only factual competitor research. Research tool costs are additive to tokens.

## Caching and routing
Reuse stable system instructions and structured context; enable prompt caching where supported and advantageous. Response caching only for deterministic unchanged tasks; do not cache stale pricing/availability research. OpenRouter model fallback is for errors, not independent quality validation. Respect provider-level privacy/data retention constraints for client and business data.

## Image generation
Treat text/vision/image models as capability-specific. Evaluate actual image output support and pricing; if unavailable, use a separate image provider behind the same internal media interface. For measurable diagrams and charts, prefer deterministic SVG/chart rendering from validated structured data.

## Credentials
Server-side OPENROUTER_API_KEY only. Never put it in front-end bundles, public GitHub, exported n8n workflows or agent prompts. Use environment variables/secret vault; key budgets and rotation.
