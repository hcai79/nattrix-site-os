const requiredFields = ['site_id', 'production_domain', 'inventory_complete', 'backup_restore_verified', 'production_writes_authorized'];
const credentialFieldPattern = /(?:api[_-]?key|token|secret|password|cookie|authorization)/i;

function findCredentialLikeFields(value, path = '') {
  if (!value || typeof value !== 'object') return [];

  return Object.entries(value).flatMap(([key, child]) => {
    const childPath = path ? `${path}.${key}` : key;
    const matches = credentialFieldPattern.test(key) ? [childPath] : [];
    return matches.concat(findCredentialLikeFields(child, childPath));
  });
}

/**
 * Validates a non-secret site onboarding record and reports prerequisites for a staging connection.
 * This function never grants production-write authorization.
 */
export function validateOnboardingChecklist(checklist) {
  const errors = [];
  const missing = requiredFields.filter((field) => checklist?.[field] === undefined || checklist[field] === null || checklist[field] === '');
  if (missing.length) errors.push(`Missing required fields: ${missing.join(', ')}`);
  if (!/^[a-z0-9-]+$/.test(checklist?.site_id ?? '')) errors.push('site_id must use lowercase letters, digits, and hyphens only');
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(checklist?.production_domain ?? '')) errors.push('production_domain must be a hostname without a protocol or path');
  for (const field of ['inventory_complete', 'backup_restore_verified', 'production_writes_authorized']) {
    if (typeof checklist?.[field] !== 'boolean') errors.push(`${field} must be a boolean`);
  }
  if (checklist?.staging_base_url) {
    try {
      const stagingUrl = new URL(checklist.staging_base_url);
      if (stagingUrl.protocol !== 'https:') errors.push('staging_base_url must use HTTPS');
      if (stagingUrl.hostname === checklist.production_domain) errors.push('staging_base_url must not use the production domain');
    } catch {
      errors.push('staging_base_url must be an absolute URL');
    }
  }
  const credentialLikeFields = findCredentialLikeFields(checklist);
  if (credentialLikeFields.length) errors.push(`Credential-like field names are not allowed: ${credentialLikeFields.join(', ')}`);

  const stagingBlockers = [];
  if (!checklist?.staging_base_url) stagingBlockers.push('staging_url_missing');
  if (checklist?.backup_restore_verified !== true) stagingBlockers.push('backup_restore_not_verified');
  if (!checklist?.integration_account_role) stagingBlockers.push('least_privilege_role_missing');
  if (!checklist?.reviewer) stagingBlockers.push('reviewer_missing');

  return {
    valid: errors.length === 0,
    errors,
    stagingReady: errors.length === 0 && stagingBlockers.length === 0,
    stagingBlockers,
    productionWritesAuthorized: checklist?.production_writes_authorized === true
  };
}
