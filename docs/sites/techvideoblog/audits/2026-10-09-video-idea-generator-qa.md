# Video Idea Generator QA Record

## Scope

- URL: `https://techvideoblog.com/video-idea-generator/`
- WordPress post ID: `1489`
- Published: 2026-10-07
- Retrieved: 2026-10-09 through the connected WordPress MCP
- Target keyword: `video idea generator`
- Action taken: read-only audit. No production changes were made.

## What is working

- The title, meta description, and focus keyword align with the reader's search intent.
- The seven-factor rubric is a useful editorial framework and the article tells readers to verify AI-generated claims.
- The article links to relevant YouTube, category, use-case, directory, and methodology destinations.
- The article preserves the existing URL, default canonical behavior, category, tag, author, and media.

## Internal-link verification

The following linked TechVideoBlog destinations returned HTTP 200 on 2026-10-09:

- `/tool-category/ai-video-generators/`
- `/use-cases/best-ai-tools-for-youtube-shorts/`
- `/platforms/best-ai-tools-for-youtube/`
- `/short-form-trends/`

No link repair is proposed for these destinations.

## Evidence and trust risks

| Priority | Finding | Why it needs review | Safe next action |
| --- | --- | --- | --- |
| P0 | The post says TechVideoBlog tests video idea generators hands-on and that the directory runs every tool through real workflow tests, but no test record is linked. | This is an unverified first-hand testing claim. | Gather a dated test protocol, prompts, tester, tools, output examples, and scoring records, or revise in a staging-only proposal to research-only wording. |
| P0 | The table of contents includes `#sources`, but the retrieved article has no Sources heading or source list. | Readers cannot trace the article's factual or methodological claims. | Add a source inventory to a staging-only proposed patch after the evidence pack is complete. |
| P1 | The article calls a Search Engine Journal link "Google's own guidance". | It is a secondary source, not Google's documentation. | Replace the reference with current [Google Search guidance on generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) in a reviewer-approved patch. Google's guidance supports manual fact-checking and review, but this audit does not treat the secondary link as a primary citation. |
| P1 | Broad statements about generator inputs, trend/social/search signals, YouTube discovery behavior, and Shorts versus long-form metrics lack claim-level citations. | Product capabilities and platform behavior vary, and advice can become stale. | Map each retained factual statement to official YouTube, product, or primary documentation, with retrieval dates. |
| P1 | A BabyLoveGrowth CTA is outside the primary video-idea workflow. | It dilutes topical focus and needs a documented relationship and disclosure decision. | Document the purpose and commercial relationship. Keep it unchanged until a reviewer approves a staging-only recommendation. |
| P1 | The externally hosted workflow image has no provenance or rights record in the article. | Image source, license, and generated-media status are not established. | Create an asset provenance record before approving the image for ongoing use. |

## Required evidence pack

1. A reproducible TechVideoBlog test log: prompt template, niche inputs, each tool/version, date, tester, output samples, seven-factor scoring, and scoring rationale.
2. First-party support for any retained claim about tool inputs, trend signals, channel-history connections, YouTube Analytics, CTR, retention, or Shorts performance.
3. A source list for the post and a fact-to-source map for its higher-impact statements.
4. An asset provenance record and an owner or reviewer decision for the external CTA.

## Proposed workflow

1. Preserve the live article while its evidence pack is collected.
2. Prepare a staging-only patch that corrects the absent Sources destination, replaces the secondary Google attribution with the official source, and changes unsupported testing language only if test evidence is unavailable.
3. Use a recorded human approve-or-return decision before any staging action.
4. Do not change the URL, canonical URL, taxonomy, existing internal links, or external CTA without the separate approvals required by policy.
