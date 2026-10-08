# Roadmap: Nattrix Site OS 2.0

## Product goal
An evidence-grounded, review-gated website growth operating system that can research a vertical, create an editable content workbook, produce finished WordPress posts and media, schedule approved articles, and learn from GSC/GA4/monetization performance.

## First end-to-end milestone (now highest priority)
Read docs/milestones/vertical-slice-v0.1.md.
- [ ] Site Blueprint and URL inventory with mocked adapter
- [ ] OpenRouter LLM gateway and cost-aware task router
- [ ] Evidence-backed vertical and competitor research
- [ ] Content workbook XLSX export and validated import
- [ ] Five-article batch producer with image/visual manifest
- [ ] Independent QA and review states
- [ ] Gutenberg draft/scheduling staging adapter
- [ ] Usage, cost, reviewer-time telemetry
- [ ] Integration tests with mocks and failure replay

## Follow-on milestones
- [ ] GSC and GA4 connectors
- [ ] Revenue/affiliate reporting
- [ ] Controlled experiment engine
- [ ] Multi-site Site Manager configurations
- [ ] Five-site rollout: CircuitsAtHome, SycamoreNet, TechVideoBlog, Sybari, DogsForest
- [ ] Safe operations automation and maintenance dashboard

## Existing foundation remains
The Portfolio Engine plugin, Supabase operational data store, Next.js dashboard and n8n orchestrator remain core infrastructure. Build only the minimum subset needed for the end-to-end slice first.

## Do not
Do not publish to production or touch live WordPress, alter existing URLs, store credentials in the repo, or auto-approve high-risk content.
