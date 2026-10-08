# Directory AI Agents and Workflow Contracts

## Universal contract
Inputs: site_id, target market/treatment, source constraints, job id, prior state.
Outputs: structured JSON validated by shared schema; evidence references; confidence; missing fields; errors; human_review_required.
Agents must not invent facts, credentials, prices, ratings, reviews, medical advice, or photos. They do not autonomously approve medical claims or send bulk outreach.

## Agent 1: Discovery
Discover candidate providers using licensed APIs, official websites, and permissioned datasets. Output names, sites, candidate location, source URL, discovery date. No bulk storage of restricted platform data.

## Agent 2: Evidence and verification
Cross-check official site and relevant professional licensing sources, normalize contact data, identify duplicates, attach evidence per field, mark conflicts. Medical licensing decisions go to human reviewers.

## Agent 3: Listing drafter
Produce neutral original descriptions strictly from approved facts; missing values remain null. Produce SEO title, excerpt, treatment tags, and internal-link suggestions. Always save as draft.

## Agent 4: Local SEO planner
Map markets, treatment demand, existing URL inventory, internal links, content gaps. Only recommend pages with verified businesses and distinctive user value. No automated doorway pages.

## Agent 5: Clinic outreach assistant
Prepare human-approved claim invitations, provider correction requests, and advertising proposals. Maintain opt-out and suppression lists; no deceptive personalization or unauthorized messaging.

## Agent 6: Lead and revenue analyst
Analyze anonymized conversion metrics, accepted inquiries, recurring listing revenue, refund/disputes, response times, city economics. Flag weak markets.

## n8n workflow: provider intake
Trigger market batch -> fetch licensed sources -> normalize -> dedupe -> evidence capture -> flag conflicts -> human review -> WordPress draft -> approval -> publish -> audit event.
Retry with exponential backoff; idempotency key site_id + source + external ID; dead-letter queue.

## n8n workflow: listing claim
Form -> verification challenge -> admin review -> update ownership status -> notify claimant -> audit event.

## n8n workflow: consultation
Form -> consent record -> spam check -> CRM contact -> approved clinic routing -> delivery status -> acceptance/rejection -> invoice if contracted -> retention policy.

## n8n workflow: refresh
Scheduled stale record detection -> re-check approved sources -> diff -> high-risk fields to review -> publish approved updates.

## n8n workflow: revenue
Stripe subscription webhook -> validate signature -> idempotent ledger update -> placement entitlement -> dashboard. Reconcile refunds and failed payments.

## Human review gates
Provider credentials; treatment medical claims; adverse risk statements; sponsorship agreements; first outreach send; contested reviews/corrections; pricing and lead-quality disputes.

## MVP build sequence
Start with discovery, evidence and listing drafting. Add outreach and revenue agents only after directory and inquiry flows work.
