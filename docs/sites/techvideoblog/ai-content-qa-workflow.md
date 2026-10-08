# TechVideoBlog AI Content QA Workflow

## Scope

Apply this workflow to the 88 Posts modified from August through October 2026. The cohort was published by an AI agent according to the owner. The goal is to preserve useful work and earned backlinks while identifying pages that need precise repair, deeper editorial work, consolidation, or no change.

## Pass 1: Structural QA

For each Post, record:

- title, URL, date, and category
- H1 and H2 hierarchy
- approximate word count
- internal and external link count
- FAQ presence when useful for the query
- image, caption, and alt-text presence where relevant
- malformed HTML, repeated blocks, empty headings, or generic opener patterns

## Pass 2: Intent and duplication QA

Compare title, primary intent, and SERP target against the local inventory. Flag:

- near-duplicate target pages
- posts that overlap an existing category, use-case, comparison, or tool profile
- terms with a better commercial destination already present on the site
- missing relevant link to a Core commercial page

## Pass 3: Trust and commercial QA

Check for:

- unsupported testing, pricing, performance, or hands-on claims
- missing methodology or affiliate disclosure where recommendations appear
- stale dates or product availability claims
- forced recommendations or irrelevant affiliate links

## Outcome classes

| Outcome | Meaning | Action |
| --- | --- | --- |
| Pass | Useful, distinct, technically clean, and adequately supported | Leave unchanged and schedule normal review |
| Targeted fix | Good intent and content, but formatting, links, metadata, or a narrow claim needs repair | Create a page-specific change brief |
| Editorial refresh | Intent is sound, but the article needs substantial evidence, structure, or usefulness improvement | Create a research-backed refresh brief |
| Consolidate | Significant overlap with an existing stronger page | Do not redirect or merge without backlink, URL, and owner review |
| Escalate | Safety, legal, severe factual, or material trust concern | Hold for owner or expert review |

## Backlink protection rule

No QA outcome authorizes a URL, canonical, redirect, or deletion change. Before any consolidation or material rewrite, capture the live URL, canonical, backlink information when available, current internal links, and the rollback approach.

## Execution order

1. Audit posts with commercial or comparison intent first.
2. Audit pages with high impressions, clicks, conversions, or backlinks when data access becomes available.
3. Audit the remaining informational posts in batches, grouped by overlapping topic.
4. Create approval-ready briefs. Do not bulk-edit production content.
