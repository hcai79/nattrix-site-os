# TechVideoBlog AI Content QA Workflow

## Scope

Apply this workflow to the 88 Posts modified from August through October 2026. The owner identified this cohort as AI-agent published. The purpose is to preserve useful content, indexed URLs, and earned backlinks while identifying precise repairs, deeper editorial work, consolidation candidates, or pages that should remain unchanged.

This workflow is planning and quality assurance. It does not authorize a URL change, deletion, redirect, canonical change, publishing action, or bulk production edit.

## Required audit record

Create one record per URL with:

- stable content ID, title, URL, publication and modification dates, category, and reviewer
- target query and intent, or an explicit `unknown` value
- H1/H2 structure, approximate word count, internal and external link counts
- FAQ usefulness, image/caption/alt-text coverage, and HTML or layout defects
- Core 40 relationship and relevant internal-link opportunities
- each material pricing, performance, testing, safety, privacy, policy, and recommendation claim
- source URLs, retrieval dates, claim class, evidence status, and risk band
- one outcome class, next action, approval status, and rollback notes

## Pass 1: structural QA

Flag malformed HTML, repeated blocks, empty headings or paragraphs, generic openers, missing answer text, broken or misleading links, and absent supporting visuals where visuals are necessary for comprehension.

## Pass 2: intent and duplication QA

Compare the title and target intent with the Core 40 and the local URL inventory. Flag near-duplicates, overlap with a stronger category or tool page, a missing relevant Core 40 link, or a commercial query that has no appropriate destination.

## Pass 3: trust and commercial QA

Check for unsupported testing, pricing, performance, or hands-on claims; stale dates and availability; missing disclosures or methodology where recommendations appear; and irrelevant outbound or affiliate links. Capture evidence before proposing wording changes.

## Outcome classes

| Outcome | Meaning | Permitted next action |
| --- | --- | --- |
| Pass | Useful, distinct, technically clean, and adequately supported | Leave unchanged and set a normal review date. |
| Targeted fix | Good intent with a narrow formatting, link, metadata, or claim repair | Prepare a page-specific, reversible change brief. |
| Editorial refresh | Sound intent but weak evidence, structure, or usefulness | Create a research-backed refresh brief for review. |
| Consolidate | Significant overlap with a stronger page | Gather URL, canonical, backlink, and rollback evidence. Require owner review. |
| Escalate | Safety, legal, severe factual, or material trust concern | Hold live edits until an owner or domain expert decides. |

## Initial calibration samples

- Post `1286`, *Best Video Editor Auto Captions*, is an editorial-refresh candidate. The prior read-only audit found a missing first FAQ answer, an empty opening paragraph, and claim evidence gaps.
- Post `1292`, *Video Stabilization AI*, is escalated. A prior read-only audit found an outbound link labeled as a TechVideoBlog directory that instead led to an unrelated third-party site. Do not change it until the intended destination is confirmed.

## Order of work

1. Audit commercial and comparison intent first.
2. Prioritize URLs with meaningful impressions, clicks, conversions, or backlinks when read-only data is available.
3. Process remaining posts in topic clusters to identify duplication and internal-link opportunities.
4. Send only evidence-backed, page-specific briefs to the Content Hub and VA Queue.

## Backlink protection

No outcome permits deletion, noindexing, URL consolidation, or redirect changes. Before any material rewrite, capture the current URL, canonical behavior, internal links, available backlink information, and a rollback approach.
