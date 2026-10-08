const reviewRequiredTypes = new Set(['wiring_diagram', 'electrical_measurement_diagram', 'safety_diagram', 'factual_comparison_graphic', 'branded_infographic', 'schematic']);
const validOrigins = new Set(['original', 'licensed', 'generated', 'manufacturer_supplied']);

export function validateMediaManifest({ content_id, assets = [] } = {}) {
  const errors = [];
  const reviewQueue = [];
  const seenIds = new Set();
  if (!content_id) errors.push({ asset: null, code: 'content_id_missing' });
  if (!Array.isArray(assets)) return { valid: false, errors: [...errors, { asset: null, code: 'assets_not_array' }], reviewQueue };

  assets.forEach((asset, index) => {
    const position = index + 1;
    if (!asset.asset_id) errors.push({ asset: position, code: 'asset_id_missing' });
    if (seenIds.has(asset.asset_id)) errors.push({ asset: position, code: 'duplicate_asset_id' });
    seenIds.add(asset.asset_id);
    if (!asset.type) errors.push({ asset: position, code: 'asset_type_missing' });
    if (!asset.alt_text?.trim()) errors.push({ asset: position, code: 'alt_text_missing' });
    if (!validOrigins.has(asset.origin)) errors.push({ asset: position, code: 'invalid_origin' });
    if (!asset.rights_note?.trim()) errors.push({ asset: position, code: 'rights_note_missing' });
    if (asset.origin === 'generated' && asset.exact_product_representation) errors.push({ asset: position, code: 'generated_exact_product_prohibited' });
    if (reviewRequiredTypes.has(asset.type)) reviewQueue.push({ asset: position, asset_id: asset.asset_id, reason: 'mandatory_human_visual_review' });
    if (asset.type === 'product_image' && asset.origin === 'generated') reviewQueue.push({ asset: position, asset_id: asset.asset_id, reason: 'product_accuracy_review' });
  });

  return { valid: errors.length === 0, errors, reviewQueue };
}
