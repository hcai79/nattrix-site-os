# Primary Hub Link Repair Plan

This plan is derived from a read-only audit. It does not authorize live edits.

## Safe repair tranche

Nine broken paths have either an exact existing destination or a strong candidate. These should be reviewed as a small, reversible source-link repair rather than a site-wide rewrite.

| Broken path | Candidate destination | Mapping | Source context |
| --- | --- | --- | --- |
| `/category/ai-caption-tools/` | `/tool-category/ai-caption-tools/` | Exact | Tools hub category card |
| `/category/ai-thumbnail-generators/` | `/tool-category/ai-thumbnail-generators/` | Exact | Tools hub category card |
| `/category/ai-video-editors/` | `/tool-category/ai-video-editors/` | Exact | Tools hub category card |
| `/category/ai-avatars/` | `/tool-category/best-ai-avatar-tools/` | Candidate | Tools hub category card |
| `/category/thumbnail-generators/` | `/tool-category/ai-thumbnail-generators/` | Candidate | Tools hub category card |
| `/platform/iphone/` | `/platforms/best-ai-video-editors-for-iphone/` | Exact | Platforms hub device card |
| `/platform/twitter-x/` | `/platforms/best-ai-tools-for-twitter-videos/` | Exact | Platforms hub platform card |
| `/tool-category/ai-avatar-tools/` | `/tool-category/best-ai-avatar-tools/` | Candidate | Tool Categories hub card |
| `/tool-category/voice-cloning-tools/` | `/tool-category/best-ai-voice-cloning-tools/` | Candidate | Tool Categories hub card |

Candidate mappings have label differences from their target titles and need an intent check before replacement.

## Redirect defect found in Core audit

The first five Core category pages were checked with the bounded internal-link audit.
The Best AI Caption Generators page links to `/tools/captions-ai-review/`. The public
endpoint returns a Rank Math 301 to `/tools/captions-ai-review-2`, which in turn
renders a 404. WordPress search still reports the intended Captions AI Review page
as ID 820 with the original URL, so there is no verified replacement destination for
the source link.

Do not change the source link to the redirect target. The redirect or the intended
page URL needs an owner-approved production diagnosis before any repair.

## Content or navigation gaps

These paths have no sufficiently relevant published page found in the read-only search. Do not redirect them to a generic hub merely to remove a 404.

- API
- Browser extension
- Facebook Reels
- Mac
- Pinterest
- Teams
- Web app
- Windows
- AI translation tools

For each gap, choose one of three options after review: create an evidence-backed page, remove the card from the source hub, or map it to an existing page only if the intent genuinely matches.

## Validation required after approval

1. Re-read each source page before editing.
2. Update only the approved href values.
3. Verify every changed destination returns HTTP 200.
4. Check the rendered page and Rank Math canonical output.
5. Add the change to the TechVideoBlog worklog.
