# Category Pillar Freshness Queue

Audit date: 2026-10-09
Scope: read-only production inspection of five Core 40 category pillars. No production page, metadata, URL, canonical, taxonomy, plugin, or theme setting was changed.

## Confirmed candidates

| Priority | Page | ID | URL | Last modified | Audit status | Why it is queued |
| --- | --- | --- | --- | --- | --- | --- |
| P0 | Best AI Video Editors | 808 | `/tool-category/best-ai-video-editors/` | 2026-05-10 | [Audit complete](2026-10-09-best-ai-video-editors-freshness.md) | Large commercial guide with 34,159 characters that needs current price, plan, and recommendation evidence. |
| P0 | Best AI Video Generators | 809 | `/tool-category/best-ai-video-generators/` | 2026-05-10 | [Audit complete](2026-10-09-best-ai-video-generators-freshness.md) | Large commercial guide with 36,393 characters, including fast-changing model and tool guidance. |
| P0 | Best AI Avatar Tools | 688 | `/tool-category/best-ai-avatar-tools/` | 2026-05-10 | [Audit complete](2026-10-09-best-ai-avatar-tools-freshness.md) | Commercial guide with 27,417 characters and policy-sensitive avatar claims. |
| P0 | Best AI Caption Generators | 803 | `/tool-category/best-ai-caption-generators/` | 2026-05-10 | [Audit complete, route blocked](2026-10-09-best-ai-caption-generators-freshness.md) | Commercial guide with 33,369 characters, pricing and workflow claims, and links to tool reviews. |
| P0 | Best AI Subtitle Generators | 686 | `/tool-category/best-ai-subtitle-generators/` | 2026-05-10 | [Audit complete, route blocked](2026-10-09-best-ai-subtitle-generators-freshness.md) | Commercial guide with 28,562 characters, which is likely to contain plan and language-support guidance. |

All five URLs resolved to existing published WordPress Pages during the inspection. The character counts are an audit-triage signal, not a quality score.

## Recommended order

The first-pass audits are complete. Next, build the source ledger and staging briefs in this order:

1. Best AI Video Editors because it now has initial official-source records in the Operations Hub and connects to established reviews.
2. Best AI Caption Generators, after the Captions AI routing decision is made.
3. Best AI Video Generators because product capability and model claims change particularly quickly.
4. Best AI Avatar Tools because privacy, consent, training, and localization statements need primary sources.
5. Best AI Subtitle Generators, after the Captions AI routing decision and shared subtitle evidence are available.

## Next-wave audit coverage

The following Core 40 pages have also received read-only first-pass audits. They are ready for evidence collection in the Operations Hub, but are not approved for a live refresh.

| Page | ID | Audit | Primary evidence concerns |
| --- | --- | --- | --- |
| Best AI Video Translators | 689 | [2026-10-10 audit](2026-10-10-best-ai-video-translators-freshness.md) | Distinguish subtitles, translated audio, dubbing, lip sync, voice options, language coverage, and related policy terms. |
| Best AI Voice Cloning Tools | 690 | [2026-10-10 audit](2026-10-10-best-ai-voice-cloning-tools-freshness.md) | Verify consent, voice likeness, impersonation safeguards, commercial use, retention, and training terms as separate claims. |
| Best AI Thumbnail Generators | 806 | [2026-10-10 audit](2026-10-10-best-ai-thumbnail-generators-freshness.md) | Verify generation scope, asset licenses, commercial use, templates, brand controls, plan limits, and policy claims. |

## Repeatable review method

For each page, make a source ledger before proposing a staging draft:

1. Extract every price, free-plan, credit, export, watermark, availability, training, privacy, and platform-support claim.
2. Capture a current first-party URL, retrieval date, and exact supporting text for each claim.
3. Classify each statement as verified fact, manufacturer claim, editorial assessment, or unresolved.
4. Check the linked review and comparison pages for conflicting price or policy guidance.
5. Prepare a narrow, block-preserving staging patch only after the page has a complete evidence pack.

## Guardrails

No page in this queue is approved for autonomous editing or publishing. Preserve all existing URLs, canonical behavior, internal-link destinations, affiliate treatment, and visual styling until a page-specific evidence pack and human approval are in place.
