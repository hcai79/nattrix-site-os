# ADR-002: Directories Pro preferred directory candidate

Status: Preferred candidate, conditional on staging validation
Date: 2026-10-08
Supersedes: ADR-001

## Evidence from vendor documentation and demo reported by project owner
- Documented content and settings import/export.
- Documented claims, reviews, notifications, custom fields, taxonomies, fieldsets, and templates.
- Public demo illustrates places, locations, maps, filters, and pricing tables.

These establish advertised or demonstrated product functionality, **not** confirmed programmatic API compatibility, scale, or hook contracts.

## Proposed architecture
- WordPress + Directories Pro: public listings, location taxonomy, search/filter UX, frontend business features and monetization where verified.
- Nattrix Directory Adapter: stable plugin-neutral upsert API and translation into the installed plugin's documented interfaces.
- Supabase: authoritative external business UUIDs, source evidence, review states, synchronization mapping and audit.
- n8n: approved source ingestion, deduplication, enrichment, moderation and batched synchronization.
- GoHighLevel: consented inquiry delivery and sales workflow.
- GeoDirectory: fallback adapter if Directories Pro integration fails acceptance tests.

## Unknowns to validate on installed plugin
1. Actual listing CPT and taxonomy identifiers; do not assume `drts_member`.
2. Whether native WP REST endpoints expose required fields and save plugin-specific geospatial data.
3. Supported hooks, callable APIs or safe import routes for idempotent create/update.
4. Claim approval and ownership transition interfaces; never update opaque plugin metadata directly.
5. Payment/subscription event synchronization and source of truth.
6. Canonical URL behavior for state/city/treatment/provider pages.
7. Scale, cache invalidation, and query performance.

## Staging acceptance
- Create 100 approved test listings; repeat the import and verify 100 remain.
- Update 20 records and verify correct custom fields, geospatial coordinates, and taxonomy relationships.
- Run claim request and human approval end-to-end.
- Validate one subscription or featured placement and correct disclosure.
- Verify lead consent and GHL delivery.
- Test authentication, authorization, input validation, retry safety, audit logs and rollback.
- Benchmark batch processing and faceted searches.
- No production deployment before acceptance.

## Procurement
Do not assume a license has been purchased. Request vendor confirmation of current extension points and licensing terms, then purchase one staging license for integration testing.

## Safety
Use permitted sources and field-level provenance; no fabricated reviews, credentials, medical claims or unsupported treatment details. Keep all imported records drafts until approved.
