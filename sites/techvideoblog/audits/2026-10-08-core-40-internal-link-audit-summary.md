# Core 40 internal-link audit summary

## Scope and method

- Date: 2026-10-08
- Source pages: all 40 URLs in `core/core-40.csv`
- Method: eight public, rate-limited batches using
  `scripts/test-core-page-internal-links.ps1`
- Result files: `2026-10-08-core-40-link-audit-batch-01.csv` through
  `2026-10-08-core-40-link-audit-batch-08.csv`

The audit checked 206 source-link rows. It is a reachability audit, not an intent,
claim-freshness, or canonical audit.

## Results

| Public response | Rows | Interpretation |
| --- | ---: | --- |
| HTTP 200 | 199 | Reachable at the time checked |
| HTTP 301 | 6 | All point to the same Captions AI Review route that redirects onward to a 404 |
| HTTP 404 | 1 | Missing Submagic vs Opus Clip comparison route |

## Findings requiring a separate decision

1. Six Core pages link to `/tools/captions-ai-review/`. That route issues a Rank Math
   301 to `/tools/captions-ai-review-2`, which renders a 404. Do not replace the
   links until the intended page URL or redirect is diagnosed.
2. Opus Clip Review and Submagic Review link to
   `/compare/submagic-vs-opus-clip/`, which returns a 404. There is no matching
   comparison in the approved Core 40 plan, so do not map it to an unrelated page.

## Repair completed during this audit

The Opus Clip Review breadcrumb used the unavailable
`/tool-category/long-video-to-shorts/` route. It now uses the exact published Core
category route `/tool-category/best-long-video-to-shorts-tools/`, and both source
and destination returned HTTP 200 after verification.

## Next safe work

Use claim-evidence records to build source-backed refresh packs for priority Core
pages. Keep redirect, canonical, URL, and comparison-page decisions out of routine
source-link repairs.
