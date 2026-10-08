# End-to-End Five-Article Pilot

## Definition of a successful vertical slice
From a single approved site blueprint, generate a strategy evidence pack, editable workbook, five publish-ready Gutenberg drafts with appropriate original/licensed visuals and source-linked claims, independently QA them, pass human approvals, and schedule via WordPress without manual formatting.

## Workflow state machine
site_onboarded -> inventory_ready -> research_ready -> strategy_proposed -> strategy_approved -> plan_exported -> plan_imported_or_approved -> batch_queued -> researching -> drafted -> visuals_ready -> qa_passed -> human_review -> approved -> staged -> scheduled -> published -> observed.

On BLOCK/RETURN: create a correction task, preserve previous versions, and resume from appropriate stage. A failed WordPress call must never produce duplicate posts.

## Research artifacts
- Niche opportunity, ICP, differentiation and exclusion rationale
- Competitor inventory with URLs, observable content clusters, offers, gaps and source dates
- Site audit: canonical/indexable URL inventory, opportunities for refresh/merge/new
- Monetization map by query intent and cluster
- Assumptions and uncertainty queue

## Workbook contract
Tabs: Blueprint; Competitors; Existing URLs; Core Pages; Support; Products/Directory; Offers; Calendar; Experiments; Performance.
Required content fields: stable_content_id, site_id, cluster_id, title, primary_query, intent, type, slug, proposed_url, existing_url_match, action (NEW|REFRESH|MERGE|SKIP|REVIEW), target_core_id, priority, evidence_status, visual_brief, review_tier, status, scheduled_for.
Round-trip import must validate IDs, duplicate slugs, collisions with existing content, relations, dates and permissions. Preview changes before saving. Excel is editable export/import, not authoritative job state.

## Publishing
- Site-specific Gutenberg layout presets.
- Store generated/lawfully sourced media with provenance, rights notes, alt text and attachment IDs.
- Save WP draft first; ensure preview parity.
- Only approval-gated pages may be scheduled.
- Default capacity up to five/week per site, configurable by weekday/time zone; queue uses site-local timestamps.
- All publishing actions must log actor, action, content_id, WP post ID, previous state and new state.

## Measurement
GSC: query/page impressions, clicks, CTR, position; GA4: organic sessions/engagement; monetization: tracked outbound clicks, affiliate conversions/revenue when available; production cost: model tokens, media generation, research/API expense, reviewer minutes.
Use 28/56/90-day windows appropriately; annotate seasonality, indexation changes, and experiments. Avoid assuming causality from single ranking changes.

## Pilot exit criteria
Five approved articles publish as intended, no accidental URL conflicts, no duplicate posts on retry, factual source records available, reviewer can approve/return in dashboard or minimal interim UI, per-article cost recorded, rollbacks possible, manual formatting unnecessary. Do not unlock auto-approval until measured error rates and sampling prove acceptable.
