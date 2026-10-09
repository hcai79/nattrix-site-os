const sourceTypes = new Set(['first_party', 'official_documentation', 'independent_editorial', 'regulatory', 'community']);
const assumptionStatuses = new Set(['open', 'validated', 'rejected']);

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export function validateResearchArtifact({ artifact_id, site_id, content_id, query, gathered_at, sources = [], assumptions = [] } = {}) {
  const errors = [];
  const unresolvedAssumptions = [];
  if (!artifact_id || !site_id || !content_id || !String(query ?? '').trim()) errors.push({ code: 'research_identity_missing' });
  if (!gathered_at || Number.isNaN(Date.parse(gathered_at))) errors.push({ code: 'gathered_at_missing_or_invalid' });
  if (!Array.isArray(sources) || !sources.length) errors.push({ code: 'sources_missing' });
  if (!Array.isArray(assumptions)) errors.push({ code: 'assumptions_not_array' });

  const seenUrls = new Set();
  (Array.isArray(sources) ? sources : []).forEach((source, index) => {
    const item = index + 1;
    if (!source?.source_id || !String(source?.title ?? '').trim()) errors.push({ source: item, code: 'source_identity_missing' });
    if (!isHttpUrl(source?.url)) errors.push({ source: item, code: 'source_url_missing_or_invalid' });
    if (!sourceTypes.has(source?.source_type)) errors.push({ source: item, code: 'source_type_invalid' });
    if (!source?.retrieved_at || Number.isNaN(Date.parse(source.retrieved_at))) errors.push({ source: item, code: 'source_retrieval_date_missing_or_invalid' });
    if (seenUrls.has(source?.url)) errors.push({ source: item, code: 'duplicate_source_url' });
    seenUrls.add(source?.url);
  });

  (Array.isArray(assumptions) ? assumptions : []).forEach((assumption, index) => {
    const item = index + 1;
    if (!String(assumption?.text ?? '').trim()) errors.push({ assumption: item, code: 'assumption_text_missing' });
    if (!assumptionStatuses.has(assumption?.status)) errors.push({ assumption: item, code: 'assumption_status_invalid' });
    if (assumption?.status === 'open') unresolvedAssumptions.push({ assumption: item, text: assumption.text });
  });

  return { valid: errors.length === 0, errors, unresolvedAssumptions };
}
