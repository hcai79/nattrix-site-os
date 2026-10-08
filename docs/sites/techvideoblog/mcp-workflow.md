# TechVideoBlog MCP Workflow

## Access boundary

The connected TechVideoBlog MCP is production access. Default to read-only tools. Do not publish, update content, alter Rank Math fields, change menus, install plugins, or edit global styles without an explicit owner instruction naming the target and change.

## Required sequence

1. Search the existing site before proposing or creating content.
2. Read the target page and its SEO metadata before proposing an upgrade.
3. Check related directory pages to prevent duplicate intent.
4. Draft locally or create an unpublished draft only when authorized.
5. Validate internal links, claims, disclosure, schema eligibility, and page hierarchy.
6. Publish only with explicit approval, then re-read the live item to verify it.
7. Record the live change in `sites/techvideoblog/worklog.md`.

## Tool selection

- Use `wp_list_pages`, `wp_list_posts`, `wp_search`, `wp_get_page`, and `wp_get_post` for inventory and research.
- Use `wp_rm_get_post_seo` before proposing SEO edits.
- Use ACF read tools to discover existing structured fields before adding new field assumptions.
- Use create or update tools only after the owner approves the exact target and scope.
