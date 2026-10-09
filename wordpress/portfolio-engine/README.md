# Nattrix Portfolio Engine

Reusable WordPress foundation for structured product records, Core Page metadata, and centralized Affiliate Offer references. The plugin is not a publishing automation system and must be installed on staging before any production rollout.

## v0.1 data model

### Product

`nattrix_product` is an admin-visible, non-public custom post type. It supports the block editor, revisions, taxonomy assignment, and REST access for authenticated authorized users. It does not create public URLs, archives, or rewrite rules.

### Product Brand and Product Category

`nattrix_product_brand` and `nattrix_product_category` classify Product records. Both are private operational taxonomies. Brand is flat; Category is hierarchical.

### Core Page metadata

Posts and pages can carry these REST-visible, editor-authorized fields:

- `nattrix_is_core_page`: boolean
- `nattrix_core_cluster`: plain text cluster label
- `nattrix_core_page_type`: `buying_guide`, `comparison`, `product_profile`, or `hub`
- `nattrix_core_priority`: integer from 0 through 100
- `nattrix_core_review_state`: `draft`, `needs_review`, or `approved`

Editors with permission can manage these values through the **Nattrix Core Page** sidebar panel. The panel uses a WordPress nonce, post capability check, output escaping, and field-specific sanitization.

### Affiliate Offer references

Product records hold a sanitized `nattrix_affiliate_offers` array. Each reference has an `offer_id`, merchant name, destination URL, optional affiliate URL, disclosure label, and status. Article HTML must refer to a Product or Offer record rather than contain a copied affiliate URL.

Administrators can add or edit offer records in the **Nattrix Affiliate Offers** panel on a Product record. A blank offer row is shown for a new record; leave it blank to avoid creating an offer. The editor rejects duplicate offer IDs, invalid statuses, and non-HTTP(S) destination URLs.

## Access control

- Product records have distinct WordPress capabilities. Activation grants them to administrators only.
- Product term management is restricted to `manage_nattrix_product_terms`.
- REST routes use the `nattrix/v1` namespace and require authentication plus `manage_options`, post-edit, or editor-level capability as appropriate.
- The custom endpoints are read-only in v0.1. Standard WordPress REST editing still uses WordPress authentication and post capability checks.

## Admin settings

Settings > Portfolio Engine stores only a site ID and human-readable affiliate disclosure label. It intentionally has no secret, credential, or affiliate-network configuration fields.

## Installation

1. Back up the target site and verify restoration.
2. Install this directory as `wp-content/plugins/nattrix-portfolio-engine` on staging.
3. Activate it as an administrator.
4. Set the site ID and disclosure label under Settings > Portfolio Engine.
5. Create a test Product and verify the authenticated REST routes.
6. Review compatibility with the existing SEO, custom-field, and custom-post-type stack before considering production.

## Tests

Run `npm test` from the repository root. The current test suite statically verifies public contract and security invariants because this development environment has no PHP or WordPress runtime. Before staging installation, run WordPress integration tests in a PHP-enabled environment.

Follow the full [staging validation runbook](../../docs/development/portfolio-engine-staging-validation.md) before considering a production rollout.

## Extension points

Future releases can add block rendering, staging-only draft creation, offer freshness fields, and outbound-link rendering without changing public article URLs. Any public Product archive, URL, taxonomy route, affiliate behavior, or production write remains an explicit approval decision.
