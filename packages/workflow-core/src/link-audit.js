function normalizeDomain(value) {
  return String(value ?? '').trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');
}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

export function evaluateInternalLinkAudit({ siteDomain, results = [] } = {}) {
  const domain = normalizeDomain(siteDomain);
  if (!domain) throw new Error('siteDomain is required');
  if (!Array.isArray(results)) throw new Error('results must be an array');

  const issues = [];
  const normalized = results.map((result, index) => {
    const item = index + 1;
    const target = String(result.target_url ?? '').trim();
    const status = Number(result.status_code);
    const record = { target_url: target, status_code: Number.isInteger(status) ? status : null };

    if (!isHttpUrl(target)) {
      issues.push({ link: item, target_url: target, reason: 'invalid_target_url', blocking: true });
      return record;
    }

    const url = new URL(target);
    if (url.hostname.toLowerCase() !== domain) {
      issues.push({ link: item, target_url: target, reason: 'outside_site_domain', blocking: true });
      return record;
    }

    if (!Number.isInteger(status) || status < 100 || status > 599) {
      issues.push({ link: item, target_url: target, reason: 'invalid_status_code', blocking: true });
    } else if (status >= 400) {
      issues.push({ link: item, target_url: target, reason: 'broken_destination', blocking: true });
    } else if (status >= 300) {
      issues.push({ link: item, target_url: target, reason: 'redirect_destination', blocking: false });
    }
    return record;
  });

  return {
    valid: !issues.some((issue) => issue.blocking),
    allResolved200: normalized.length > 0 && normalized.every((result) => result.status_code === 200),
    summary: {
      checked: normalized.length,
      resolved_200: normalized.filter((result) => result.status_code === 200).length,
      redirects: normalized.filter((result) => result.status_code >= 300 && result.status_code < 400).length,
      broken: normalized.filter((result) => result.status_code >= 400 && result.status_code <= 599).length
    },
    issues
  };
}
