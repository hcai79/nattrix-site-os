# ADR-001: Adopt GeoDirectory for BeautyInfoSpot

Status: Accepted
Date: 2026-10-08

## Decision
Use GeoDirectory as the WordPress-facing directory platform for BeautyInfoSpot. Do not build competing custom business post types, location tables, or search/filter UIs in the shared Portfolio Engine.

## Responsibilities
- GeoDirectory: public business listings, location browsing, category/treatment associations, profile rendering, and directory search/filter functionality supported by installed edition/add-ons.
- Portfolio Engine: site configuration, approval and provenance policy, integration adapter, internal SEO rules, consent and lead tracking, reporting, automation hooks.
- Supabase: operational master records, source evidence, deduplication, approvals, agent jobs, advertiser metrics, lead events; map IDs to GeoDirectory records.
- n8n: approved source ingestion -> verification -> review -> GeoDirectory draft/import -> publication after approval.
- Next.js dashboard: inventory, exceptions, review queue, claims, inquiries, and monetization.

## Integration approach
1. Audit existing WordPress and GeoDirectory versions/add-ons in staging.
2. Use documented GeoDirectory APIs, import capabilities, hooks, and WordPress REST where supported. Validate exact capabilities against installed versions.
3. Maintain a mapping of site_id + business_uuid to WordPress/GeoDirectory listing ID.
4. Write only approved facts and use drafts until a human approves.
5. Preserve provenance in Supabase, never replace sourced fields with unverified agent output.
6. Handle listings and city URL structure through GeoDirectory routing and WordPress rewrites; test canonical URLs before indexing.
7. Prefer GeoDirectory's native listing claims and paid listing functionality when licensed and suitable; otherwise integrate separate workflows without duplicating listing data.
8. Add explicit paid placement labels, inquiry consent, audit trails, and correction mechanisms.

## Avoid
- Duplicated directory CPTs or parallel WordPress listing databases.
- Scraping or storing third-party restricted platform data contrary to terms.
- Publishing fabricated reviews, pricing, practitioner qualifications, or treatment availability.
- Assuming GeoDirectory add-ons are included or installed.

## First sprint acceptance
A staging WordPress site with GeoDirectory installed, one treatment taxonomy, Las Vegas directory hub, 3 approved example listings, working review/publish path, and confirmed sync ID mapping. No production deployment until verified.
