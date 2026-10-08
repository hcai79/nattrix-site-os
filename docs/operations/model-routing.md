# Model Routing Playbook

## Objective

Spend model capacity where judgment matters and use fast, lower-cost models for bounded operational work. The routing decision should be based on risk and ambiguity, not only task length.

## Tiers

| Tier | Use when | Examples | Required controls |
| --- | --- | --- | --- |
| Fast | Input and output are structured, consequences are reversible, and correctness can be checked automatically | CSV cleanup, duplicate detection, URL inventory, title-length checks, structured extraction, formatting | Provide schema, validate output, sample results |
| Standard | Contextual judgment is needed but the work is not high-risk | content briefs, code implementation, SEO audits, comparison outlines, internal links | cite evidence, run QA, document assumptions |
| Frontier | Error has material cost or the decision changes multiple systems | security review, architecture, migrations, production incidents, technical claims, legal or affiliate policy | use primary evidence, require review, define rollback |

## Default workflow

1. Use Fast to inventory, normalize, classify, or draft structured candidate data.
2. Use Standard to synthesize the candidates into a recommendation or implementation.
3. Use Frontier only to resolve uncertainty, approve high-impact decisions, or review a proposed irreversible change.
4. Save accepted outputs as durable artifacts so the next task starts from evidence rather than rediscovery.

## Anti-patterns

- Do not ask a frontier model to perform repetitive transcription or simple table cleanup.
- Do not use a fast model to make publish, security, canonical URL, medical, legal, or high-value affiliate decisions.
- Do not split a tightly coupled technical decision among models without one accountable final review.
- Do not create autonomous loops that publish, alter URLs, or change monetization without human approval.

## Prompt contract for low-cost tasks

Every lightweight task should include: source location, allowed scope, expected schema, examples of invalid output, and a clear stop condition. Reject results that invent facts or omit required fields.
