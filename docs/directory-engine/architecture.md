# Directory Engine | Nattrix Site OS

## Design principle
Add a reusable directory module without disrupting the existing CircuitsAtHome affiliate/content model. Each WordPress site remains independently deployed. Supabase stores cross-site operational data. WordPress owns public presentation. n8n coordinates jobs. Next.js dashboard provides review/approval. No direct production publishing without approval.

## Suggested repository modules
- wordpress/portfolio-engine/modules/directory/: post types, taxonomies, admin settings, REST integration, frontend blocks
- database/migrations/: site-scoped directory entities, policies, indexes
- packages/directory/: shared schemas and validation
- agents/directory/: discovery, evidence, verification, listing drafting, local SEO, outreach, performance contracts
- automations/directory/: n8n flows and runbooks
- apps/dashboard/: directory inventory, review queue, claims, inquiries, billing, performance
- docs/sites/beautyinfospot.md: site-specific configuration

These paths are proposed, not an assertion that implementation directories already exist.

## Data entities
sites; directory_businesses; business_locations; treatment_categories; business_treatments; practitioners; credential_checks; source_evidence; business_claims; directory_profiles; media_assets; location_pages; content_approvals; inquiries; inquiry_consent; lead_delivery; lead_acceptance; advertiser_accounts; listing_plans; subscriptions; placements; outreach_events; audit_events; job_runs.

Every business and operational row has site_id; external IDs are namespaced by source. Use stable internal UUIDs. Record field-level provenance and last-checked timestamp for mutable facts.

## Essential fields
Business: id, site_id, legal/display name, normalized address, coordinates (licensed or independently obtained), phone, website, categories, operational status, published status, claimed status, last_verified_at.
Evidence: id, business_id, field_name, source_url, source_type, observed_at, rights_status, confidence, reviewer_id.
Practitioner: id, business_id, display name, role, licensing jurisdiction, credential verification status, checked_at; never claim credential verification from an LLM alone.
Inquiry: id, site_id, business_id, treatment_id, customer contact, timestamp, referral URL, consent text/version, opt-in timestamp, routing status, disposition. Avoid collecting medical history in generic forms.
Placement: id, business_id, location/category scope, start/end, paid flag, disclosure label, priority rules.
Claims: business_id, requester, verification method, evidence, decision, reviewer, timestamps.

## WordPress interfaces
Directory business custom post type and treatment/location taxonomies; provider profile template; directory listing cards; filters; profile claim form; consultation form; admin verification and approval queue. Decide whether GeoDirectory is adopted before implementing custom CPT equivalents to prevent duplication.

## API contracts (proposed)
- POST /directory/import-candidates (authenticated, idempotent)
- GET /directory/review-queue (admin)
- POST /directory/{businessId}/approve (admin)
- POST /directory/{businessId}/publish (approved only)
- POST /directory/claims (public with anti-abuse)
- POST /directory/inquiries (public with consent, throttling, spam checks)
- GET /directory/metrics (authorized)
Use existing plugin REST namespace when implementation begins.

## Security and governance
- WordPress API credentials and Supabase service keys server-side only.
- Per-site tenant isolation with Supabase RLS and explicit service-role boundaries.
- Separate public submission privileges from internal approvals.
- Rate limits, spam protection, audit trail, data retention/deletion requests, backup and rollback.
- Confirm privacy/advertising rules and medical lead handling with counsel before launch.
- Avoid prohibited data scraping, third-party review copying, and unauthorized image use.
- Paid placement must not imply clinical superiority.

## Implementation order
1. Inspect existing plugin, migrations, dashboard, and agent contracts.
2. Choose GeoDirectory integration vs own post types, and write ADR.
3. Build migrations + validation + RLS.
4. Build WordPress listing templates + admin approval.
5. Implement evidence-first discovery pipeline.
6. Add consented inquiries + GHL integration.
7. Add paid plans, placements, billing and reconciliation.
8. Add dashboard metrics, monitoring, and tests.

## Test gates
Unit: normalization, duplicates, provenance, taxonomy, slug collisions, ranking disclosures.
Integration: WP draft -> approval -> publish, idempotent sync, inquiry routing, webhook retries, payment events.
Security: RLS cross-site isolation, auth, public form abuse, secret leakage.
Acceptance: approved profiles only, no fabricated attributes, correct consent, rollback and audit history.
