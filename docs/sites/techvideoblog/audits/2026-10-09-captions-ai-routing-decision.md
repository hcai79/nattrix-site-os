# Captions AI Review Routing Decision Record

Checked: 2026-10-09
Affected Core 40 page: Captions AI Review, WordPress page ID `820`
Published source URL: `https://techvideoblog.com/tools/captions-ai-review/`

## Read-only verification

The published WordPress page ID `820` exists and its title is `Captions AI Review`. A live HTTP check found:

| URL | Observed response | Finding |
| --- | --- | --- |
| `/tools/captions-ai-review/` | `301` | The expected review URL redirects. |
| `/tools/captions-ai-review-2/` | `404` | The apparent redirect destination does not resolve to a live page. |

This is a confirmed Core 40 routing problem. No production content, slug, permalink, canonical, redirect, or internal link was changed during this check.

## Why this needs an owner decision

A fix could require changing the page permalink, changing a redirect, or changing Core 40 source links. Each action can affect indexed URLs, backlinks, canonical behavior, and historical attribution. The operating rules require explicit owner approval for that class of change.

## Evidence required for the fix proposal

1. The WordPress permalink and slug currently assigned to page `820`.
2. The redirect rule owner and exact source-to-destination chain, including any host or CDN layer.
3. Search Console or analytics evidence, if available, for traffic and inbound-link importance of both paths.
4. A list of every internal source that points to the old path.
5. A staging verification showing the selected final URL returns `200`, has the intended canonical, and preserves the page body and SEO metadata.

## Candidate approaches for approval

| Approach | Benefit | Risk or dependency |
| --- | --- | --- |
| Restore the intended URL and remove or correct the faulty redirect | Preserves the Core 40 route and existing internal links | Requires identifying where the redirect is configured and confirming historical URL behavior. |
| Keep a revised canonical review URL and add a single permanent redirect from the legacy path | Can preserve existing authority while using an intentional final slug | Requires an approved final URL and a backlink review. |
| Repair only known internal source links | Narrow editorial change | Does not solve external visitors or the defective redirect chain. |

## Current status

Blocked on an owner-approved routing plan. Do not substitute another tool review, alter page `820`, or bulk-edit internal links until the final canonical route and redirect owner are confirmed.
