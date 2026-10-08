# Portfolio Engine

Portfolio Engine is a reusable WordPress plugin for structured product, Core Page, and affiliate-offer data. It does not connect to Supabase, the dashboard, n8n, GSC, or any production WordPress site.

## Data model

### Product

`nattrix_product` is a public, REST-enabled custom post type. It supports title, editorial content, excerpts, featured images, and revisions. Its URL base is `/products/`.

Products can be classified with the `nattrix_product_brand` and `nattrix_product_category` taxonomies. No taxonomy terms are seeded because categories belong to each site's content strategy.

### Core Page

Core Page metadata is available on posts, pages, and products. A record becomes a Core Page when `_nattrix_core_page_type` has an allowed value.

| Meta key | Allowed value / shape |
| --- | --- |
| `_nattrix_core_page_type` | `buying-guide`, `comparison`, `product-profile`, or `hub` |
| `_nattrix_core_cluster` | Sanitized text |
| `_nattrix_core_status` | Portfolio lifecycle status, from `planned` through `winner` or `rework` |
| `_nattrix_core_product_ids` | Unique IDs that resolve to `nattrix_product` posts |

The model supports the Core 30 workflow without embedding CircuitsAtHome-specific terms or taxonomy seeds.

### Affiliate Offer

`nattrix_offer` is an internal custom post type. Each offer has a product ID, merchant, destination URL, network, and status. Destination URLs are stored in offer metadata only. They are not registered in the public WordPress REST API and must never be written into article HTML.

## REST contract

All routes are under `/wp-json/nattrix-portfolio/v1` and require `manage_nattrix_portfolio`:

- `GET /products`
- `GET /core-pages`
- `GET /offers`
- `POST /offers`

`POST /offers` requires `product_id`, `merchant`, and an `http` or `https` `destination_url`. The route rejects invalid products, empty merchants, and unsupported URL schemes. The offer routes are intentionally privileged because they return merchant destination URLs.

The standard WordPress REST endpoint for `nattrix_product` remains available to users who have the post type's WordPress capabilities. Core Page metadata uses WordPress's per-post edit authorization.

## Permissions

The plugin uses custom product and offer capabilities. On activation it grants these, plus `manage_nattrix_portfolio`, only to administrators. Editors and other roles receive no additional access by default. Assign the relevant custom capabilities deliberately if a different role needs access.

## Settings

**Settings → Portfolio Engine** contains a non-secret Site key. This is a stable lowercase identifier for a site's future portfolio integrations. It is intentionally not a connection configuration and does not store credentials.

## Extending safely

- Add site-specific taxonomy terms through WordPress administration or a site-level plugin, not this shared plugin.
- Use product IDs and offer IDs in templates or blocks. Resolve offers at render time with the appropriate disclosure and user-fit logic.
- Register new metadata through separate, documented model classes with sanitization and authorization callbacks.
- Do not use this plugin to automate production publishing or direct external-system writes.

## Tests

The tests use the official WordPress PHPUnit test library. Set `WP_TESTS_DIR` to a prepared WordPress test library directory, then run:

```sh
phpunit -c wordpress/portfolio-engine/phpunit.xml.dist
```

The test suite covers content registration, metadata sanitization, offer validation, and REST authorization. The repository intentionally does not include WordPress test dependencies or credentials.

## Open question

Offer records use an internal custom post type for v0.1 so WordPress can manage structured records independently per site. A later shared operational layer may synchronize a normalized offer representation with Supabase, but that is explicitly outside this milestone.
