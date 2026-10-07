# Editorial Production Workflow

## Objective

Produce accurate, useful, monetizable content at scale using specialized AI agents with targeted human review.

The workflow is designed to:
- reduce hallucination risk
- separate research from writing
- prevent self-review bias
- route human attention to high-value uncertainty
- improve over time from reviewer feedback
- preserve SEO and commercial quality across multiple sites

## Primary workflow

1. SEO Opportunity Agent
2. Content Strategy Agent
3. Research Agent
4. Evidence Normalization
5. Writer Agent
6. Visual Content Agent
7. SEO QA Agent
8. Fact & Claim QA
9. Internal Linking Agent
10. Monetization Agent
11. Risk Scoring
12. Human Review
13. Publish / Return / Escalate
14. Post-publish Monitoring
15. Reviewer Feedback Capture

## Key design principle

No single agent should research, write, score, and approve its own work.

## Content classes

### Class A: Core commercial
Examples:
- buying guides
- comparisons
- high-revenue product pages

Human review: required and deep.

### Class B: Supporting commercial/informational
Examples:
- product support pages
- buyer education
- high-intent explainers

Human review: required initially, later may become sampled if performance is stable.

### Class C: Supporting informational
Examples:
- tutorials
- definitions
- troubleshooting
- evergreen educational articles

Human review: light, risk-based.

## Batch size

Default batch: 5 articles.

Reason:
- enough volume for efficiency
- small enough to detect systemic issues
- reviewer corrections can influence the next batch

## Publish states

Planned -> Validated -> Researched -> Drafted -> Visuals Ready -> QA -> Human Review -> Approved -> Published -> Monitored

## Human decision outcomes

### APPROVE
Ready to publish.

### APPROVE WITH MINOR FIXES
Non-material edits can be applied without restarting the entire workflow.

### RETURN TO AGENT
Material issue requires revision.

### ESCALATE
Needs domain expert, owner, legal/compliance, or stronger source validation.

### REJECT / CONSOLIDATE
Content should not be published as a separate URL.

## Post-publish loop

Monitor:
- impressions
- clicks
- rankings
- CTR
- affiliate clicks
- conversion
- revenue
- engagement
- internal-link assists

Use actual performance to refine future topic and template decisions.
