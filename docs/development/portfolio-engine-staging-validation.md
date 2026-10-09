# Portfolio Engine v0.1 Staging Validation

Use this runbook only on a non-production WordPress clone. It is a release gate for `wordpress/portfolio-engine`; it does not authorize production installation or content changes.

## Preconditions

1. Confirm the host and site URL are staging, not production.
2. Verify a current backup and a successful restoration path.
3. Record the WordPress version, PHP version, active theme, active plugins, and existing custom post types and taxonomies.
4. Use a test administrator and a separate non-administrator editor account. Do not use an owner account or share credentials.
5. Install the packaged plugin from the reviewed commit. Do not install an unreviewed build from a local working directory.

## Reviewed staging package

The current reviewed package is [`nattrix-portfolio-engine-v0.1.0-r5.zip`](../../dist/nattrix-portfolio-engine-v0.1.0-r5.zip), built from commit `3291a2cc2bfa85fa9cbba53d01964cb6bd9e82cb`.

Before uploading it to staging, verify its SHA-256 hash is:

```
C77F8D022E66917FF0CEFFFC707D829244D3DC3C158289754439D4F375DFD7FD
```

If the hash differs, stop and obtain a newly reviewed package. Do not substitute a production plugin file or a local uncommitted build.

## Activation checks

1. Activate **Nattrix Portfolio Engine** as an administrator.
2. Confirm that the Product menu appears in wp-admin and that neither a public Product archive nor public Product permalink is created.
3. Confirm the private Product Brand and hierarchical Product Category taxonomies appear only within Product administration.
4. Visit **Settings > Portfolio Engine**. Save a non-sensitive test site ID and disclosure label. Confirm no credential, API key, affiliate-network secret, or production URL field is present.
5. Deactivate and reactivate once. Confirm existing test metadata remains intact and WordPress rewrite behavior for existing content has not changed.

## Content-model checks

1. Create one Product named `Staging validation product` with a Brand and a Category.
2. Add one Affiliate Offer through the registered product metadata using an authenticated authorized workflow. Use a harmless HTTPS test URL such as `https://example.com/offer`; do not use a real affiliate URL.
3. Confirm the saved offer includes a unique offer ID, merchant name, destination URL, disclosure label, and valid status.
4. Try an invalid offer status and a malformed URL. Confirm validation rejects or normalizes the input rather than saving unsafe data.
5. Open one existing staging Page and one existing staging Post. In the **Nattrix Core Page** sidebar panel, set a cluster, page type, priority, and review state. Save and reload each item.
6. Confirm the saved Core Page fields match the allowed values and a priority outside 0 through 100 is not accepted.

## Permission and REST checks

1. As an administrator, request `GET /wp-json/nattrix/v1/health` and confirm a successful authenticated response.
2. As an administrator, request `GET /wp-json/nattrix/v1/core-pages` after marking the staging test items as Core Pages. Confirm only expected metadata is returned.
3. Request `GET /wp-json/nattrix/v1/products/{id}/offers` for the test Product. Confirm the expected offer is returned.
4. As the editor account, confirm it can edit only the WordPress content it is permitted to edit and cannot administer Portfolio Engine settings or Product capabilities unless deliberately granted.
5. As an anonymous visitor, confirm each custom REST route is denied. Confirm no Product data is exposed through a new public archive, taxonomy route, search result, or permalink.

## Compatibility checks

1. Open existing pages that use the site's active editor or page-builder stack. Confirm no visual, block, or editor-console error appears from activating the plugin.
2. Check the installed SEO plugin's current canonical and title behavior on an unchanged existing page. No values should change.
3. Confirm existing ACF, Custom Post Type UI, cache, and security-plugin screens remain functional. Do not alter their configuration as part of this check.
4. Clear only the staging cache if needed to view the activation state. Do not clear or touch production caches.

## Required evidence to attach to the release review

- Plugin version and Git commit SHA
- Staging base URL and validation date
- Screenshots or authenticated response captures for the three custom routes
- Permission test results for administrator, editor, and anonymous visitor
- A list of observed compatibility issues, including PHP warnings or debug log entries
- Confirmation that no existing URL, canonical, redirect, taxonomy path, navigation item, affiliate ID, or production record changed

## Rollback

If a validation check fails, deactivate the plugin on staging. Do not delete test content until the failure is recorded because it may be useful for diagnosis. Restore the staging backup only if deactivation does not return the site to its previous working state. A production rollout requires a separate approval after staging validation passes.
