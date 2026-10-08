# 2026 Frontier LLM Training & Orchestration Matrix

**Status:** User-supplied research captured October 2026. **Not independently verified.** Model names, availability, provider relationships, architectures, context limits, capabilities and prices below are hypotheses, not validated OpenRouter model catalog records. Do not hard-code these into production routing until live catalog checks and benchmark evaluations pass.

## Frontier model candidates

| Model / Provider (as researched) | Architecture (reported) | Context (reported) | Estimated API cost per 1M input/output tokens | Proposed use |
| --- | --- | --- | --- | --- |
| Grok 4.7 (xAI / SpaceXAI) | Closed | 500K | $2 / $6 | Live social trends, X analysis, research and coding |
| Claude 5.5 Sonnet (Anthropic) | Closed | 200K+ | $2 / $10 | Orchestration head, structured JSON, high-quality natural prose |
| GPT-6 Sol (OpenAI) | Closed | 1M | $1 / $4 | Low-latency subagents, GEO/technical SEO, metadata and data handling |
| Gemini 3.8 Pro (Google DeepMind) | Closed | 2M | $2 / $12 | Very long code/document context and multimodal ingestion |
| Kimi K3 (Moonshot AI) | Open-weight | 1M | $3 / $15 hosted; self-hosting compute not included | Long-horizon coding and content audit |
| Llama 4 Maverick (Meta AI) | Open-source (reported) | 1M | $0.19 / $0.60 hosted | Private deployment, semantic mapping |
| Llama 4 Scout (Meta AI) | Open-source (reported) | 1.3M | $0.10 / $0.30 hosted | High-volume classification |
| DeepSeek R1 / V4 (DeepSeek) | Open-weight | 1M | $0.14 / $0.28 | Background reasoning, math, extraction |

**Caution:** Claimed "free if self-hosted" should not be treated as zero cost. Hardware, operations, inference, maintenance, and security remain costs. A hosted API does not provide an air-gapped or local-only privacy guarantee.

## Additional open-weight / open-source candidates

| Model family (as researched) | Context (reported) | Cost (reported) | Proposed role |
| --- | --- | --- | --- |
| DeepSeek R1 / V4 | 1M | ~$0.14 / ~$0.28 | High-turn background agents and analytical extraction |
| Llama 4 Maverick / Scout | 1M–10M | Host-dependent / ~$0.50 through APIs | Private/local deployment where feasible and permitted |
| Kimi K3 / GLM-5.3 | 1M | ~$1.40 / ~$4.40 | Long-horizon coding and bug fixing |

User source references: https://deploybase.ai/articles/open-source-llm-models and https://llm-stats.com/ai-models (not validated here).

## Content creation and SEO candidate matrix

| Model / family (as researched) | Proposed strength | Proposed agent role |
| --- | --- | --- |
| Claude 5.5 Sonnet | Human-sounding prose, intent matching, long-form structure | Pillars, buying guides, landing pages, editorial polishing |
| Grok 4.7 | Social trends and viral copy | Trend discovery, news-led opportunities |
| GPT-6 Sol | SEO schemas, sitemaps, structured operations | Programmatic SEO, keyword grouping, metadata, technical SEO |
| Kimi K3 | Website-wide synthesis and audit | Content gaps, topical maps, cross-links |
| Qwen 3.8 Max / Omni | Multilingual localization | Localized pages and cultural variants |
| Mistral Large 4 | Bulk self-hosted automation | Structured product descriptions and large-batch classification |

## Interpretation for Nattrix Site OS

Treat these as a **candidate routing hypothesis**, not binding model assignments. In particular:
- Proposed "orchestrator head" = Claude candidate. Verify that exact model ID and benchmark against alternatives before making it default.
- Economy background tasks = Llama Scout/DeepSeek candidates, subject to schema accuracy and live provider pricing.
- High-quality editorial tasks = Claude candidate, subject to evaluations.
- Technical structured tasks = GPT candidate, subject to evaluations.
- Long-context audits = Gemini/Kimi candidates, only when actually needed.
- Trend analysis = Grok candidate, but model access alone does not guarantee live X or web retrieval; verify data source/tool integration.
- Multilingual localization = Qwen candidate.
- Bulk structured writing = Mistral candidate.
- Every named model must map to an actual current OpenRouter `model_id` in the runtime registry before selection.

## Required runtime validation

1. Check model availability and exact IDs from OpenRouter.
2. Record live context, modality, structured-output/tool support, and current input/output token pricing.
3. Confirm provider data-retention/privacy requirements.
4. Test a fixed task-specific evaluation suite for each candidate.
5. Select cheapest qualified candidate by **cost per accepted result** (including retries and QA costs), not token price alone.
6. Maintain allowlists, spend caps, fallback policies and audit logs.
7. Do not transmit regulated or sensitive client data to a hosted provider without appropriate approval and controls.

## Model evaluation questions

- Is the exact model/version genuinely available via OpenRouter?
- Can it return valid JSON conforming to our schemas consistently?
- Are claims grounded in retrieved evidence?
- Does it create natural, useful WordPress content with low human correction time?
- What is the full cost of one approved article, not just one inference?
- Does it work with tool-calling, large contexts, multilingual text, images, and rate limits as required?

## Source and maintenance policy

These tables reflect user-provided research, not an OpenRouter pricing guarantee. Refresh the registry periodically and date every benchmark. Keep the source matrix intact for future comparisons. Do not silently substitute unverified model names into `config/model-routing.example.json`.
