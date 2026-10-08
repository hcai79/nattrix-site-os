# TechVideoBlog Content Inventory

`2026-10-08-content-inventory.csv` is a read-only metadata snapshot from the connected WordPress MCP. It includes published Page and Post IDs, title, URL, slug, parent ID, status, and modification timestamp. It deliberately excludes article body content, credentials, analytics, affiliate data, and user data.

## Snapshot summary

- 144 published Pages
- 88 published Posts
- 24 root Pages and 120 child Pages
- 141 Pages modified 91 to 180 days before the October 8, 2026 snapshot
- 71 Posts modified within 30 days before the snapshot

Largest Page hierarchies:

| Parent | Child Pages |
| --- | ---: |
| Tools | 41 |
| Tool Categories | 21 |
| Compare | 16 |
| Use Cases | 14 |
| Platforms | 6 |
| Industries | 6 |

## Refresh policy

Treat this as a dated planning artifact, not a production source of truth. Refresh it with another read-only MCP export before making a named live-change proposal, because titles, URLs, hierarchy, and content status can change.
