# Shared Types

Canonical data contracts shared between dashboard, automations, and integrations.

Initial entities:
- Site
- ContentItem
- CorePage
- Cluster
- Product
- AffiliateOffer
- Opportunity
- Approval
- RevenueEvent

## Site package contracts

Machine-readable contracts for site packages live in `schemas/`. They keep onboarding data portable without putting credentials or copied production content in Git.

- `site-manifest.schema.json`: non-secret site identity, content-model, approval, and integration contract
- `content-inventory-item.schema.json`: normalized CMS inventory record
- `work-item.schema.json`: auditable planned work record

Run `scripts/validate-site-packages.ps1` before committing site package changes.
