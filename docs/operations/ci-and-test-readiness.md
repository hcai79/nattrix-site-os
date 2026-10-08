# CI and Test Readiness

## Current baseline

`.github/workflows/php-lint.yml` runs PHP syntax checks for files under `wordpress/` on relevant pushes and pull requests. It intentionally has read-only repository permissions and requires no secrets.

## Next step for functional tests

The Portfolio Engine PHPUnit suite needs a WordPress test-library installation exposed through `WP_TESTS_DIR`. Add a dedicated WordPress test job when the project can provide:

1. A PHP runtime and PHPUnit version pinned in project dependencies.
2. A disposable MySQL or MariaDB service for the WordPress test suite.
3. A reproducible script that obtains the WordPress test library and core version.
4. A matrix policy covering currently supported WordPress and PHP versions.

Do not point test configuration at a production database or production WordPress directory.
