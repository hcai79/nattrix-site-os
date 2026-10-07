# Nattrix Site OS Agent Instructions

## Mission

Build a reusable operating system for a portfolio of SEO-driven WordPress sites. The system should reduce manual work while preserving editorial quality, SEO safety, monetization control, and human approval for high-value actions.

## First site

CircuitsAtHome.com is the first implementation.

Its initial positioning is:

> Electronics tools, test equipment, and practical DIY electronics guidance for makers, hobbyists, students, and technicians.

Its commercial strategy centers on a Core 30 of high-intent landing pages supported by informational content.

## Global rules

1. Never delete production content automatically.
2. Never change a production URL, permalink, canonical, redirect, or taxonomy path without explicit approval.
3. Never hard-code affiliate URLs into article HTML. Reference centralized offer records.
4. Core commercial pages require human approval before publication or major modification.
5. Supporting articles may eventually auto-publish only after automated QA passes and site policy allows it.
6. Database changes must use migrations and be reversible where practical.
7. Shared functionality should be reusable across sites through configuration.
8. Do not store secrets in Git.
9. Do not alter production infrastructure without an explicit approval step.
10. Preserve existing rankings, backlinks, URLs, and historical content unless a documented migration plan exists.
11. Prefer structured data models over free-form duplication.
12. Agents must return structured outputs where a schema exists.
13. Research and writing must distinguish verified facts from assumptions.
14. Commercial recommendations should optimize user fit first, revenue second.
15. Do not create large numbers of thin programmatic pages.

## Approval classes

### Human approval required
- Core 30 page publication
- Mass updates
- URL changes
- redirects
- production database migrations
- changes to affiliate IDs
- deleting or noindexing indexed content
- changes to monetization policy
- automated publishing rules

### Eligible for future automated execution
- keyword opportunity collection
- draft briefs
- support article drafts
- internal-link suggestions
- schema generation
- metadata suggestions
- refresh detection
- performance reporting

## Engineering expectations

- Add tests for reusable logic.
- Document public interfaces.
- Prefer small modules.
- Avoid site-specific logic in shared packages.
- Keep WordPress, dashboard, database, and automation concerns separated.
- Make failures observable.
- Use staging before production.

## Agent handoff flow

SEO Opportunity -> Content Strategy -> Research -> Writer -> SEO QA -> Internal Linking -> Monetization -> Human Approval / Publish

Refresh Agent runs on existing URLs based on performance changes.

Portfolio Manager prioritizes work across all connected sites.
