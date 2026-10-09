function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function validUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function paragraph(text) {
  return `<!-- wp:paragraph -->\n<p>${escapeHtml(text)}</p>\n<!-- /wp:paragraph -->`;
}

export function renderGutenbergDraft({ title, summary, sections = [], sources = [] } = {}) {
  if (!String(title ?? '').trim()) throw new Error('A draft title is required');
  if (!String(summary ?? '').trim()) throw new Error('A draft summary is required');
  if (!Array.isArray(sections) || !sections.length) throw new Error('A draft needs at least one section');

  const blocks = [
    `<!-- wp:heading {"level":1} -->\n<h1>${escapeHtml(title)}</h1>\n<!-- /wp:heading -->`,
    paragraph(summary)
  ];

  sections.forEach((section, index) => {
    if (!String(section?.heading ?? '').trim() || !String(section?.body ?? '').trim()) {
      throw new Error(`Section ${index + 1} needs a heading and body`);
    }
    blocks.push(`<!-- wp:heading {"level":2} -->\n<h2>${escapeHtml(section.heading)}</h2>\n<!-- /wp:heading -->`);
    blocks.push(paragraph(section.body));
  });

  if (sources.length) {
    if (!Array.isArray(sources) || sources.some((source) => !validUrl(source?.url) || !String(source?.label ?? '').trim())) {
      throw new Error('Each source needs a label and an HTTP(S) URL');
    }
    const sourceItems = sources.map((source) => `<li><a href="${escapeHtml(source.url)}" rel="nofollow noopener">${escapeHtml(source.label)}</a></li>`).join('');
    blocks.push('<!-- wp:heading {"level":2} -->\n<h2>Sources</h2>\n<!-- /wp:heading -->');
    blocks.push(`<!-- wp:list -->\n<ul>${sourceItems}</ul>\n<!-- /wp:list -->`);
  }

  return blocks.join('\n\n');
}
