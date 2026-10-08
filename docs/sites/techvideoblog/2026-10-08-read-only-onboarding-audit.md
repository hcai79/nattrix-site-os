# TechVideoBlog Read-Only Onboarding Audit

Audit date: 2026-10-08

Scope: read-only WordPress MCP inspection. No production settings, plugins, themes, content, URLs, metadata, analytics, or affiliate links were changed.

## Confirmed inventory

- Site environment reports `production`.
- WordPress reports version `7.1.3` and PHP `8.1.34`.
- There are 144 published pages and 88 published posts, for 232 published content items before considering media or taxonomy records.
- The active theme is Kadence `1.4.5`.
- There are 23 active plugins.

## Existing stack relevant to the Site OS

| Existing component | Onboarding treatment |
| --- | --- |
| Kadence theme and Kadence Blocks / Pro | Preserve. Future draft rendering must support Gutenberg and Kadence blocks without changing global styles. |
| Rank Math SEO and Rank Math SEO PRO | Preserve as the single SEO system. Do not change canonicals, schema, sitemap, robots, metadata, or redirects during onboarding. |
| Advanced Custom Fields PRO and Custom Post Type UI | Inventory before introducing any structured-content model. Do not replace existing fields or post types. |
| WP Rocket and Imagify | Preserve. No cache or image-optimization changes in this milestone. |
| BackWPup | Confirm the restoration path before a staging or plugin rollout. |
| Easy MCP AI | Existing controlled read/write integration surface. Use read-only inventory first. |
| BabyLoveGrowth Integration | Treat as an existing external publishing path. Do not alter its rules or credentials during this milestone. |
| WP All Import and ACF add-ons | Treat as an existing bulk-import capability. Do not run imports until collision-prevention rules are proven on staging. |

## Current onboarding decision

TechVideoBlog is an existing-content site, not a blank implementation. Its 232 published URLs become protected inventory. The Core 40 and future supporting plan must resolve to one of `NEW`, `REFRESH`, `MERGE`, `SKIP`, or `REVIEW` after collision checks. No new proposal may silently replace an existing URL.

## Required before staging integration

1. Confirm the staging URL and a successful restore test.
2. Export the full page and post inventory with canonical, status, parent, taxonomy, and modification data.
3. Map the approved Core 40 to existing page IDs and URLs.
4. Define the site-specific Gutenberg and Kadence block presets for a staging-only draft.
5. Confirm the reviewer for tool pricing, product changes, affiliate disclosures, and comparison claims.
6. Audit the existing automation paths before enabling any Site OS write action.

## Explicitly not recommended now

- Theme replacement or global-style changes
- SEO-plugin replacement or configuration changes
- Cache, image optimization, security, analytics, consent, navigation, or redirect changes
- Bulk imports or automatic publishing
- Replacing ACF, Custom Post Type UI, or existing content structures
