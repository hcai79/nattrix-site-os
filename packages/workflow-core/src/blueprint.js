const requiredFields = [
  'site_id', 'domain', 'status', 'locale', 'audience', 'positioning',
  'monetization_modes', 'existing_url_policy', 'cluster_policies', 'content_mix',
  'cadence_per_week', 'reviewer', 'evidence_thresholds', 'media_policy', 'spend_caps'
];

export function validateSiteBlueprint(blueprint) {
  const missing = requiredFields.filter((field) => blueprint?.[field] === undefined || blueprint[field] === null || blueprint[field] === '');
  const errors = [];

  if (missing.length) errors.push(`Missing required fields: ${missing.join(', ')}`);
  if (!/^[a-z0-9-]+$/.test(blueprint?.site_id ?? '')) errors.push('site_id must use lowercase letters, digits, and hyphens only');
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(blueprint?.domain ?? '')) errors.push('domain must be a hostname without a protocol or path');
  if (!Number.isInteger(blueprint?.cadence_per_week) || blueprint.cadence_per_week < 0 || blueprint.cadence_per_week > 5) errors.push('cadence_per_week must be an integer from 0 to 5');
  if (!Array.isArray(blueprint?.monetization_modes)) errors.push('monetization_modes must be an array');
  if (!Number.isFinite(blueprint?.spend_caps?.monthly_usd) || !Number.isFinite(blueprint?.spend_caps?.per_article_usd)) errors.push('spend_caps requires numeric monthly_usd and per_article_usd values');

  return { valid: errors.length === 0, errors };
}
