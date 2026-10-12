# TechVideoBlog site configuration

This directory holds configuration and audit artifacts for TechVideoBlog. It is not a WordPress theme, plugin, backup, or production connection.

`site-blueprint.json` uses the shared Site Blueprint contract. Its deliberately conservative defaults preserve existing URLs, require owner review for commercial pages, set paid model spend to zero, and keep the site in a read-only pilot state. These defaults do not authorize a production write, publishing action, URL change, redirect, taxonomy change, plugin change, or configuration change.

`onboarding-checklist.json` records only verified, non-secret observations from the read-only WordPress audit. It must be updated after a staging environment, a restore test, and a least-privilege integration account are available.

The reusable `validateOnboardingChecklist` workflow contract reports staging blockers and only reports the explicit `production_writes_authorized` value. A configured staging URL must be HTTPS and must not be the production domain. The contract cannot grant production access.

## Before any staging connection

1. Provide a non-production staging URL.
2. Verify backup restoration for that staging clone.
3. Create a least-privilege integration account that can create drafts only.
4. Record the reviewer responsible for approve-or-return decisions.
5. Update the onboarding checklist without adding credentials, tokens, cookies, or API keys.

Live production access remains out of scope for this configuration. Any approved live change must be separately logged in `worklog.md`; no worklog exists until such a change actually happens.
