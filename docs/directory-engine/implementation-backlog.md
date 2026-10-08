# Directory Engine | Implementation Backlog

## Epic A | Repository integration
- DIR-001 [P0] Audit existing plugin, agent contracts, Supabase migrations, dashboard and CI.
- DIR-002 [P0] Architecture decision record: GeoDirectory adapter vs custom CPT; avoid duplicate models.
- DIR-003 [P0] Add site config for BeautyInfoSpot with feature flags.
- DIR-004 [P0] Define JSON schemas, taxonomy, provenance and approval statuses.

## Epic B | Database and security
- DIR-010 [P0] Add site-scoped business, location, treatment and evidence tables.
- DIR-011 [P0] Add uniqueness/dedupe rules, source timestamps, audit events.
- DIR-012 [P0] Add RLS policies and tenant isolation tests.
- DIR-013 [P0] Add business claim and admin review tables.

## Epic C | WordPress frontend
- DIR-020 [P0] Create listing, city, treatment, and provider page templates.
- DIR-021 [P0] Add filters, breadcrumbs, canonical URLs and SEO metadata.
- DIR-022 [P0] Add verified-facts and sponsored-placement disclosures.
- DIR-023 [P0] Build claim and correction forms.
- DIR-024 [P1] Add sitemap, structured data and noindex rules for empty filters.

## Epic D | Agent pipeline
- DIR-030 [P0] Discovery workflow using approved sources.
- DIR-031 [P0] Evidence capture, normalization and duplicate matching.
- DIR-032 [P0] Listing draft generation with strict provenance.
- DIR-033 [P0] Human review queue and WordPress draft publishing.
- DIR-034 [P1] Freshness checks, retries, idempotency and dead-letter queue.

## Epic E | Inquiries and revenue
- DIR-040 [P0] Consent-aware consultation inquiry form with anti-spam.
- DIR-041 [P0] GHL routing, delivery and accepted-lead status.
- DIR-042 [P1] Clinic accounts and claim verification.
- DIR-043 [P1] Stripe subscription and paid placement integration.
- DIR-044 [P1] Billing disputes, refund handling and advertiser reporting.

## Epic F | QA and rollout
- DIR-050 [P0] Test on staging with 20 approved Las Vegas profiles.
- DIR-051 [P0] Verify medical claims, licensing statements, rights and consent.
- DIR-052 [P0] Test responsive UX, accessibility, schema, SEO and performance.
- DIR-053 [P1] Pilot advertiser outreach and pricing.
- DIR-054 [P1] Gate national expansion on quality and unit economics.

## Initial sprint
Deliver DIR-001 to DIR-004, ADR, schema proposal, and a staging demonstration. No production content or bulk outreach in sprint 1.
