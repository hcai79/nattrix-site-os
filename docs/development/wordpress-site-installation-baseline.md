# WordPress Site Installation Baseline

This is the minimum repeatable baseline for CircuitsAtHome, TechVideoBlog, BeautyInforSpot, and future sites. Apply it to a staging clone first. It does not authorize production changes, plugin changes, theme changes, URL changes, or publishing.

## Required before connecting a site

1. A working staging environment with a different base URL from production.
2. A verified backup and a documented restoration path.
3. Current WordPress core, PHP, active theme, and plugin inventory saved in the site onboarding record.
4. A site-specific least-privilege WordPress integration account. Do not reuse an owner or administrator account.
5. A Site Blueprint with domain, positioning, reviewer, evidence threshold, spend caps, cadence, visual policy, and existing-URL policy.
6. A read-only URL, post, page, taxonomy, and canonical inventory before any content proposal.

## Plugin policy

| Category | Baseline decision | Rule |
| --- | --- | --- |
| Nattrix Portfolio Engine | Install on staging when its first WordPress milestone is complete | Activate only after staging QA. It is not yet ready for a production installation. |
| SEO plugin | Keep the one already used by the site | Never run Rank Math and Yoast together. Do not change metadata, sitemap, schema, canonicals, or redirects in this rollout. |
| Backup / restore | Use the existing host or established backup provider | Verify a restoration path before plugin or theme work. |
| Security / firewall | Keep the existing host or established security control | Do not add overlapping firewall or login-security plugins without an audit. |
| Cache / performance | Preserve the existing cache stack | Never stack caching or image-optimization plugins casually. Test any change on staging. |
| Redirection | Preserve the existing redirect owner | Do not install a new redirect manager or edit redirects without explicit approval. |
| Analytics / consent | Preserve the existing analytics and consent controls | Do not add tracking scripts or change consent behavior in this milestone. |
| Custom fields / page builders | Preserve the active stack | Do not migrate ACF, Elementor, Gutenberg, or a page builder during onboarding. |

## Theme policy

No theme installation or replacement is required to onboard a site.

- Preserve the active production theme and its global styles.
- Confirm that staging can create standard Gutenberg drafts before the renderer is connected.
- Use a child theme only when an approved, site-specific presentation change requires custom code.
- Do not migrate themes while preserving historical rankings and existing page layouts is a priority.
- The Portfolio Engine must expose structured data and editorial controls without depending on a particular theme.

## Site-specific first pass

| Site | First safe action | Do not change yet |
| --- | --- | --- |
| CircuitsAtHome | Create staging inventory and validate the five-item pilot template | Electrical visuals, Core commercial pages, affiliate records, production theme |
| TechVideoBlog | Import the existing page and URL inventory, then map the Core 40 to existing URLs | Existing URLs, canonicals, redirects, taxonomy, global style, automation settings |
| BeautyInforSpot | Create a Blueprint and read-only inventory after confirming the canonical domain and positioning | Theme, URL structure, existing SEO plugin, publishing cadence |

## Owner-provided onboarding packet

For each new site, provide or confirm:

- production domain and staging URL
- host and backup owner
- WordPress integration account with least privilege
- current SEO plugin and cache/security stack
- reviewer for commercial and high-risk content
- legal disclosure text and affiliate policy
- weekly publishing ceiling and site time zone

Never put a WordPress application password, hosting password, affiliate credential, or API key in Git, Sheets, or chat.
