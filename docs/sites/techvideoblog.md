# TechVideoBlog

## Site role

TechVideoBlog is the first authority-directory implementation for tested AI video tools for creators. Its live tagline is: "The Tested AI Video Tools Directory for Creators."

## Current connected-system inventory

Read-only inspection on October 8, 2026 found a connected WordPress 7.1.3 site at `https://techvideoblog.com` with 28 installed plugins and 88 posts reported by the MCP listing. The site has Pages, Posts, ACF Pro, Rank Math Pro, Kadence, FacetWP, SearchWP, WP Rocket, and an active Easy MCP AI connection.

The active theme is Kadence 1.4.5. The connected ACF interface currently reports no field groups, so any future Portfolio Engine compatibility work must inspect the live page structure and existing post metadata before assuming ACF is the active content model.

The WordPress content system is treated as production. No production change is authorized by this document.

## Operating model

- Use Pages for tool profiles, category hubs, use-case pages, comparisons, and other directory pages.
- Use Posts for tutorials and editorial guidance.
- Retain the existing `/tool-category/` URL convention for directory category pages.
- Use keyword-only slugs and backend parent pages for hierarchy.
- Keep affiliate destinations centralized. Do not paste affiliate URLs into body copy.
- Require a read-only audit and owner approval before changing a published page.

## Next safe work

1. Export a complete read-only page and post inventory into the local site package.
2. Audit existing money pages against the authority-page checklist.
3. Build a prioritized backlog from real gaps, stale claims, missing internal links, and current monetization coverage.
4. Design the site adapter for the Portfolio Engine only after a staging path is confirmed.

See `docs/sites/techvideoblog/` and `sites/techvideoblog/` for the operating records.
