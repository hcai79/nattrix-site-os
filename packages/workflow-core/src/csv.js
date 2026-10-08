function escapeCell(value) {
  const text = String(value ?? '');
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function exportCsv(rows, columns) {
  if (!Array.isArray(rows) || !Array.isArray(columns) || !columns.length) throw new Error('Rows and at least one column are required');
  return [columns, ...rows.map((row) => columns.map((column) => row[column] ?? ''))]
    .map((values) => values.map(escapeCell).join(','))
    .join('\r\n');
}

export function parseCsv(csv) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let index = 0; index < csv.length; index += 1) {
    const char = csv[index];
    const next = csv[index + 1];
    if (char === '"' && quoted && next === '"') { cell += '"'; index += 1; continue; }
    if (char === '"') { quoted = !quoted; continue; }
    if (char === ',' && !quoted) { row.push(cell); cell = ''; continue; }
    if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') index += 1;
      row.push(cell); rows.push(row); row = []; cell = ''; continue;
    }
    cell += char;
  }
  if (quoted) throw new Error('Malformed CSV: unclosed quoted cell');
  if (cell || row.length) { row.push(cell); rows.push(row); }
  if (!rows.length) return [];
  const [headers, ...data] = rows;
  if (new Set(headers).size !== headers.length) throw new Error('Malformed CSV: duplicate headers');
  return data.filter((values) => values.some((value) => value !== '')).map((values, index) => {
    if (values.length !== headers.length) throw new Error(`Malformed CSV: row ${index + 2} has ${values.length} cells; expected ${headers.length}`);
    return Object.fromEntries(headers.map((header, cellIndex) => [header, values[cellIndex]]));
  });
}
