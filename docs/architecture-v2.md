# Nattrix Site OS 2.0: Portfolio Growth Operating System

Status: implementation specification. Supersedes the narrow single-site rollout sequence for product priorities; retains WordPress plugin, Supabase, Next.js, n8n, and editorial controls.

## Mission
Manage a portfolio of independent WordPress websites through site-specific strategies and shared automated workflows. Target 95% reduction in routine manual effort after validation, not 95% unattended publication or guaranteed article quality.

## First end-to-end slice
1. Register a site with read-only WordPress access and a Site Blueprint.
2. Inventory current sitemap, posts, pages, categories, canonical URLs and top GSC URLs when connected.
3. Research vertical, audience, competitors and monetization, saving source evidence and uncertainties.
4. Propose Core commercial pages and supporting clusters, deduplicate against existing URLs, and generate an editable XLSX/CSV workbook.
5. Human approves a five-article batch.
6. Execute brief -> grounded research -> draft -> visual plan and asset -> separate fact/technical/SEO QA -> human review.
7. Generate formatted Gutenberg-block drafts in WordPress staging, schedule approved content at up to five/week/site.
8. Collect GSC/GA4/revenue data, propose refreshes and experiments, never silently rewrite proven pages.

## Separation of responsibilities
- WordPress: public CMS and reusable site plugin; independent per domain.
- Supabase: source of truth for blueprints, evidence, topics, jobs, approvals, assets, experiment logs, metrics.
- Next.js: portfolio dashboard and human-review cockpit.
- n8n: durable scheduling/orchestration, retries and alerts; worker service executes bounded LLM jobs.
- OpenRouter: model gateway and usage-metered task router. Models do not receive infrastructure credentials.
- Codex: develops platform code. It is not the always-on production orchestrator.
- MainWP optional: plugin updates/backups outside editorial publishing flow.

## Agent execution
Use typed inputs/outputs, versioned prompts, idempotency keys, task/job state, execution audit trails, checkpoints, timeouts, maximum retries, approval state, and model/cost telemetry. No cross-site publishing without site-scoped permissions.

## Site Blueprint contract
site_id, domain, status, wp_staging_base, locale, audience, positioning, monetization_modes, competitor_seed_domains, existing_url_policy, cluster_policies, content_mix, cadence_per_week (default 5 only after approval), style_token_profile, block_templates, legal_disclosures, reviewer, escalation_rules, evidence_thresholds, media_policy, spend_caps, experiment_policy.

## Pilot
Use CircuitsAtHome first; then SycamoreNet, TechVideoBlog, Sybari and DogsForest. Keep SamsungTechWin protected until low-risk automation is validated. Treat site targets and weekly cadence as configurable ceilings, not quotas.

## Boundaries
Do not give any agent unrestricted production writes. Never delete, redirect, canonicalize, noindex, or overwrite existing ranked URLs automatically. No made-up testing or specs. Electrical wiring/safety diagrams require human expert review. Directory entities and merchant offers must be verified rather than fabricated.
