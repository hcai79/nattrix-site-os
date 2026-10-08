# Multi-site Governance

## Separation rule

| Location | Owns | Must not contain |
| --- | --- | --- |
| `agents/` | reusable role contracts | site-specific credentials or editorial claims |
| `packages/` | shared schemas and rules | theme or individual-site implementation |
| `wordpress/portfolio-engine/` | reusable WordPress models and APIs | hard-coded brands, affiliate links, or production configuration |
| `sites/<site-key>/` | site decisions, non-secret config, backlogs | copied production exports or secrets |
| `docs/sites/<site-key>/` | strategy and editorial rules | shared platform contracts |
| external systems | credentials, analytics, live content | unreviewed automation rules |

## Onboarding checklist

1. Create the site package from `sites/_template/`.
2. Write positioning, audience, topic boundaries, and monetization policy.
3. Record the live CMS access level and publishing approval policy.
4. Perform a read-only content and technical inventory.
5. Establish an evidence-backed backlog before writing or changing pages.
6. Confirm disclosure, privacy, analytics, and cookie requirements.
7. Configure plugin and integration work only in staging or local development first.

## Change classes

| Class | Examples | Approval |
| --- | --- | --- |
| Read-only | inventory, SEO audit, content gap research | agent may perform |
| Draft | briefs, backlog records, unpublished content | agent may prepare |
| Reversible live edit | copy or metadata update on a named page | owner approval unless explicitly delegated |
| High impact | publishing, URL, canonical, navigation, affiliate, plugin, or global-style changes | explicit owner approval |

## Minimal operating record

Each material live change needs a dated worklog entry with target, reason, source evidence, approver, validation result, and rollback path.
