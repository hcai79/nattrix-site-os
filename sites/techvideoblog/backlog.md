# TechVideoBlog Backlog

All items below are local planning work. They must be based on a fresh content inventory before any production action.

| Priority | Work item | Outcome | Evidence needed | Status |
| --- | --- | --- | --- | --- |
| P0 | Create complete content inventory | One local source for pages, posts, type, URL, parent, status, and modified date | `inventory/2026-10-08-content-inventory.csv` | Complete |
| P0 | Repair confirmed primary-hub 404s | Ten mapped href instances are repaired and verified, and the rebuilt Tool Categories hub no longer emits its three broken paths. Eight platform navigation gaps remain. The Core audit also found a Captions AI Review URL redirecting to a 404; it needs an approved redirect diagnosis rather than a source-link substitution. | `audits/2026-10-08-directory-link-audit.csv`, `audits/2026-10-08-core-40-link-audit-batch-01.csv`, and `audits/2026-10-08-link-repair-plan.md` | In progress |
| P0 | Establish Core 40 routing model | Core 40 is defined, all 40 URLs return HTTP 200, and the Tool Categories parent page is upgraded as the first pillar. Continue through the remaining priority pillars. | `core/core-40.csv`, `audits/2026-10-08-core-40-availability.csv`, and `docs/sites/techvideoblog/core-40-strategy.md` | In progress |
| P1 | Complete site-wide internal-link audit | Extend the initial 75-link audit across all published Pages and Posts | Read-only crawl and destination validation | Planned |
| P0 | Audit commercial-page templates | Identify missing verdict, fit guidance, pricing caveat, methodology, disclosure, and links | Five-profile audit in `audits/2026-10-08-tool-profile-quality-audit.md` | In progress |
| P0 | Audit AI-agent Post cohort | Apply structural, intent, duplicate, claim, and internal-link QA to all 88 Posts published from August through October 2026 | `docs/sites/techvideoblog/ai-content-qa-workflow.md` and read-only post inspection | In progress |
| P0 | Verify public testing and pricing claims | Begin with the Best AI Video Tools pillar, whose published pricing and policy snapshot is dated 2026-05-08. Match claims such as "Hands-On Tested," scores, dates, and prices to current evidence before edits. | `audits/2026-10-08-best-ai-video-tools-claim-freshness.md` and page-level source review | Ready |
| P0 | Confirm analytics, Search Console, and affiliate source of truth | Establish an evidence-backed prioritization baseline | Owner confirmation or read-only access | Needs owner |
| P1 | Map directory hierarchy and internal links | Find orphaned tool profiles, category gaps, and weak conversion paths | Inventory plus page reads | Planned |
| P1 | Review plugin overlap and security posture | Document overlapping SEO, caching, and security plugins without changing them | Owner-approved technical audit | Planned |
| P1 | Define Portfolio Engine adapter requirements | Confirm compatibility with ACF, Rank Math, existing page model, and staging | Staging information and technical inventory | Blocked on staging |
| P2 | Build first evidence-backed upgrade queue | Name exact pages and proposed changes, no live writes | Gaps, traffic, and affiliate data | Planned |
