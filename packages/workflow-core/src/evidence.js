const validClaimClasses = new Set(['verified_fact', 'derived_fact', 'editorial_assessment', 'manufacturer_claim', 'community_sentiment']);
const validImpactBands = new Set(['low', 'medium', 'high']);

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export function validateEvidencePack({ claims = [], checkedAt = new Date().toISOString() } = {}) {
  const errors = [];
  const reviewTriggers = [];

  claims.forEach((claim, index) => {
    const item = index + 1;
    if (!String(claim.text ?? '').trim()) errors.push({ claim: item, code: 'claim_missing' });
    if (!validClaimClasses.has(claim.class)) errors.push({ claim: item, code: 'invalid_claim_class' });
    if (!validImpactBands.has(claim.impact)) errors.push({ claim: item, code: 'invalid_impact_band' });
    if (!Number.isInteger(claim.confidence) || claim.confidence < 0 || claim.confidence > 100) errors.push({ claim: item, code: 'invalid_confidence' });
    if (!claim.source_url || !isHttpUrl(claim.source_url)) errors.push({ claim: item, code: 'citation_missing_or_invalid' });
    if (!claim.source_type) errors.push({ claim: item, code: 'source_type_missing' });
    if (!claim.checked_at || Number.isNaN(Date.parse(claim.checked_at))) errors.push({ claim: item, code: 'checked_date_missing_or_invalid' });

    if (claim.impact === 'high' && (!claim.source_url || !isHttpUrl(claim.source_url))) reviewTriggers.push({ claim: item, reason: 'high_impact_claim_missing_citation', blocking: true });
    if ((claim.confidence ?? 0) < 80) reviewTriggers.push({ claim: item, reason: 'confidence_below_80', blocking: false });
    if (['editorial_assessment', 'manufacturer_claim', 'community_sentiment'].includes(claim.class)) reviewTriggers.push({ claim: item, reason: `claim_class_${claim.class}`, blocking: false });
  });

  if (Number.isNaN(Date.parse(checkedAt))) errors.push({ claim: null, code: 'pack_checked_date_invalid' });
  return {
    valid: errors.length === 0,
    publishable: errors.length === 0 && !reviewTriggers.some((trigger) => trigger.blocking),
    errors,
    reviewTriggers
  };
}

export function calculateRiskBand({ commercial = 0, technical = 0, uncertainty = 0, visual = 0, change = 0 } = {}) {
  const scores = [commercial, technical, uncertainty, visual, change];
  if (!scores.every((score) => Number.isInteger(score) && score >= 0 && score <= 3)) throw new Error('Each risk dimension must be an integer from 0 to 3');
  const total = scores.reduce((sum, score) => sum + score, 0);
  if (total <= 3) return { total, band: 'low', requiredReview: 'light' };
  if (total <= 7) return { total, band: 'medium', requiredReview: 'standard' };
  if (total <= 11) return { total, band: 'high', requiredReview: 'deep' };
  return { total, band: 'critical', requiredReview: 'owner_or_domain_expert' };
}
