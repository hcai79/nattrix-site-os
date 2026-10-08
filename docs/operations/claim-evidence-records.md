# Claim Evidence Records

## Purpose

Claim evidence records make factual refresh work portable across portfolio sites.
They store the source and verification context for one material claim without copying
credentials, affiliate destinations, or production-only data into the repository.

Use one record per claim when it affects pricing, plans, availability, policies,
compatibility, testing, performance, or a recommendation that needs review.

## Contract

Use `packages/shared-types/schemas/claim-evidence-record.schema.json`.

Store site-specific records in `sites/<site-key>/evidence/` when a research pack is
ready to be committed. A record must contain a public HTTPS source URL, a checked
date, source type, confidence score, and status.

## Review rules

- Prefer an official pricing, policy, documentation, or help-center source.
- Mark a claim `unresolved` rather than inventing a value.
- Mark time-sensitive evidence `stale` before reusing it when the source or claim
  may have changed.
- Treat pricing, privacy, AI-training, and comparative claims as review-required even
  when a source exists.
- Keep affiliate URLs out of evidence records. Evidence sources establish facts;
  monetization records belong in the Portfolio Engine offer model.

## Example

```json
{
  "id": "opus-clip-pricing-2026-10",
  "site_key": "techvideoblog",
  "content_url": "https://example.com/tools/opus-clip-review/",
  "claim": "The tool offers a free plan and paid plans.",
  "claim_class": "verified_fact",
  "source_url": "https://vendor.example/pricing/",
  "source_type": "official_pricing",
  "checked_at": "2026-10-08",
  "confidence": 95,
  "status": "verified",
  "notes": "Do not infer an exact price unless the official price and billing period are recorded."
}
```

The URLs above are illustrative and must never be copied into published content.
