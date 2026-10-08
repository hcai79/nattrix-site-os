const requiredFields = [
  'stable_content_id', 'site_id', 'cluster_id', 'title', 'primary_query', 'intent',
  'type', 'slug', 'proposed_url', 'action', 'target_core_id', 'priority',
  'evidence_status', 'review_tier', 'status'
];

const validActions = new Set(['NEW', 'REFRESH', 'MERGE', 'SKIP', 'REVIEW']);
const validEvidenceStatuses = new Set(['unverified', 'partial', 'verified']);
const validReviewTiers = new Set(['light', 'standard', 'deep']);

function normalizedSlug(value) {
  return String(value ?? '').trim().toLowerCase().replace(/^\/+|\/+$/g, '');
}

function normalizedUrl(value) {
  try {
    const url = new URL(value);
    url.search = '';
    url.hash = '';
    url.pathname = url.pathname.replace(/\/$/, '') || '/';
    return url.toString();
  } catch {
    return null;
  }
}

export function validatePlanRows(rows, { siteId, existingInventory = [], knownCoreIds = [] } = {}) {
  const errors = [];
  const changes = [];
  const seenIds = new Set();
  const seenSlugs = new Set();
  const existingUrls = new Set(existingInventory.map((item) => normalizedUrl(item.canonical_url)).filter(Boolean));
  const coreIds = new Set(knownCoreIds);

  rows.forEach((row, index) => {
    const rowNumber = index + 2;
    const missing = requiredFields.filter((field) => !String(row[field] ?? '').trim());
    if (missing.length) errors.push({ row: rowNumber, field: null, code: 'required_field_missing', message: `Missing: ${missing.join(', ')}` });
    if (row.site_id && siteId && row.site_id !== siteId) errors.push({ row: rowNumber, field: 'site_id', code: 'site_mismatch', message: 'Row does not belong to this site.' });
    if (seenIds.has(row.stable_content_id)) errors.push({ row: rowNumber, field: 'stable_content_id', code: 'duplicate_content_id', message: 'stable_content_id must be unique.' });
    seenIds.add(row.stable_content_id);

    const slug = normalizedSlug(row.slug);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) errors.push({ row: rowNumber, field: 'slug', code: 'invalid_slug', message: 'Slug must be lowercase words separated by hyphens.' });
    if (seenSlugs.has(slug)) errors.push({ row: rowNumber, field: 'slug', code: 'duplicate_slug', message: 'Slug duplicates another workbook row.' });
    seenSlugs.add(slug);

    const proposedUrl = normalizedUrl(row.proposed_url);
    if (!proposedUrl) errors.push({ row: rowNumber, field: 'proposed_url', code: 'invalid_url', message: 'proposed_url must be an absolute URL.' });
    if (proposedUrl && existingUrls.has(proposedUrl) && row.action === 'NEW') errors.push({ row: rowNumber, field: 'proposed_url', code: 'existing_url_collision', message: 'NEW content collides with an existing canonical URL.' });
    if (!validActions.has(row.action)) errors.push({ row: rowNumber, field: 'action', code: 'invalid_action', message: 'Action must be NEW, REFRESH, MERGE, SKIP, or REVIEW.' });
    if (!validEvidenceStatuses.has(row.evidence_status)) errors.push({ row: rowNumber, field: 'evidence_status', code: 'invalid_evidence_status', message: 'Evidence status is invalid.' });
    if (!validReviewTiers.has(row.review_tier)) errors.push({ row: rowNumber, field: 'review_tier', code: 'invalid_review_tier', message: 'Review tier is invalid.' });
    if (row.target_core_id && coreIds.size && !coreIds.has(row.target_core_id)) errors.push({ row: rowNumber, field: 'target_core_id', code: 'unknown_core_id', message: 'target_core_id is not in the approved Core Pages set.' });
    if (row.scheduled_for && Number.isNaN(Date.parse(row.scheduled_for))) errors.push({ row: rowNumber, field: 'scheduled_for', code: 'invalid_schedule_date', message: 'scheduled_for must be a valid ISO date.' });
    if (row.type === 'core_commercial' && row.review_tier !== 'deep') errors.push({ row: rowNumber, field: 'review_tier', code: 'core_review_required', message: 'Core commercial items require deep review.' });
    if (row.evidence_status !== 'verified' && row.action !== 'SKIP') changes.push({ stable_content_id: row.stable_content_id, outcome: 'blocked', reason: 'evidence_not_verified' });
    else changes.push({ stable_content_id: row.stable_content_id, outcome: 'preview_only', action: row.action, proposed_url: proposedUrl });
  });

  return { valid: errors.length === 0, errors, changes };
}
