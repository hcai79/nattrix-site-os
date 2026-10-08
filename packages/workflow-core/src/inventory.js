export function normalizeUrl(input, siteDomain) {
  const url = new URL(input, `https://${siteDomain}`);
  if (url.hostname !== siteDomain) throw new Error('Inventory URL must belong to the site domain');
  url.hash = '';
  url.search = '';
  url.pathname = url.pathname.replace(/\/{2,}/g, '/').replace(/\/$/, '') || '/';
  return url.toString().replace(/\/$/, url.pathname === '/' ? '/' : '');
}

export function buildUrlInventory(records, siteDomain) {
  const seen = new Set();
  return records.map((record) => {
    const canonical_url = normalizeUrl(record.canonical_url ?? record.url, siteDomain);
    if (seen.has(canonical_url)) throw new Error(`Duplicate canonical URL: ${canonical_url}`);
    seen.add(canonical_url);
    return {
      stable_url_id: record.stable_url_id,
      canonical_url,
      content_type: record.content_type ?? 'unknown',
      title: record.title ?? '',
      status: record.status ?? 'published',
      observed_at: record.observed_at ?? new Date().toISOString()
    };
  });
}
