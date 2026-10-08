# Directory Foundation Audit

Date: October 8, 2026

Scope: read-only MCP inventory of TechVideoBlog Pages and Posts, followed by review of the primary directory hubs. No live changes were made.

## Inventory baseline

- 144 published Pages
- 88 published Posts
- Primary directory hubs: `/tools/`, `/platforms/`, and `/tool-category/`
- Trust pages found: `/how-we-test-ai-tools/` and `/affiliate-disclosure/`

## Observations to verify

The destination check below was performed from the publicly accessible site with no authentication or write actions. It checked 75 unique internal URLs extracted from the homepage and the `/tools/`, `/platforms/`, and `/tool-category/` hubs.

| Area | Observed evidence | Why it matters | Next safe action |
| --- | --- | --- | --- |
| Tool hub URL paths | The `/tools/` hub contains links using `/category/ai-caption-tools/` and similar paths, while the dedicated Tool Categories hub uses `/tool-category/` paths. Five `/category/` destinations returned 404. | Competing conventions create confirmed broken internal links. | Map each broken destination to the intended live category before editing. |
| Platform hub paths | The `/platforms/` hub links to nine unavailable `/platform/` destination paths. | Visitors cannot reach several stated device and workflow directories. | Determine whether each page should be created, redirected, or removed from the hub. |
| Tool category paths | Three `/tool-category/` links returned 404. | The parent directory hub contains broken navigational cards. | Confirm intended category names and existing replacement pages. |
| Tool profile links | The `/tools/` hub links to examples such as `/tools/opus-clip/`; the page inventory lists the published profile as `/tools/opus-clip-review/`. Both URLs returned 200, so this is not a broken-link finding. | Multiple live paths may still dilute canonical signals. | Inspect canonicals and redirect behavior before making a recommendation. |
| Static commercial claims | Major hubs and the homepage contain claims about testing, scores, tool counts, and pricing. Several core hub pages were last modified in May 2026. | Claims and price references are time-sensitive and affect trust. | Build an evidence pack per featured tool before changing wording or prices. |
| Homepage freshness | The homepage contains visible 2025 dates alongside an active 2026 publishing program. | Stale date cues can undermine freshness and CTR. | Review every visible date and only update those supported by current evidence. |
| Directory template consistency | The hubs are large HTML blocks rather than a shared structured content model. | Repeated changes risk drift across pages. | Design a non-production template or block pattern after the link and claim audit. |

## Recommended sequence

1. Produce a complete local metadata inventory from the read-only CMS listing.
2. Map the 18 confirmed 404 paths to intended replacement URLs or an explicit removal decision.
3. Review the top commercial pages against the authority-page quality checklist.
4. Build a named, evidence-backed upgrade queue for owner approval.
5. Only then consider site-wide templates, Portfolio Engine installation, or bulk improvements.

## Do not do yet

- Do not alter URL paths, canonical URLs, redirects, menus, Rank Math data, or global styles.
- Do not replace testing, score, pricing, or affiliate claims without evidence.
- Do not install the Portfolio Engine on production before staging and compatibility validation.
