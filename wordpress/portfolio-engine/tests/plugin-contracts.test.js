import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../../../', import.meta.url);
const readPluginFile = (path) => readFile(new URL(`wordpress/portfolio-engine/${path}`, root), 'utf8');

test('Portfolio Engine defines a non-public product model with explicit capabilities', async () => {
  const source = await readPluginFile('includes/class-content-types.php');
  assert.match(source, /PRODUCT_POST_TYPE = 'nattrix_product'/);
  assert.match(source, /'public' => false/);
  assert.match(source, /'show_in_rest' => true/);
  assert.match(source, /'map_meta_cap' => true/);
  assert.match(source, /grant_administrator_capabilities/);
  assert.match(source, /manage_nattrix_product_terms/);
});

test('Portfolio Engine sanitizes structured metadata and centralized offer URLs', async () => {
  const source = await readPluginFile('includes/class-meta-models.php');
  assert.match(source, /sanitize_offers/);
  assert.match(source, /sanitize_offer_url/);
  assert.match(source, /in_array\( \$scheme, array\( 'https', 'http' \), true \)/);
  assert.match(source, /nattrix_is_core_page/);
  assert.match(source, /nattrix_affiliate_offers/);
  assert.match(source, /current_user_can\( 'edit_post', \$post_id \)/);
});

test('Portfolio Engine custom REST routes require authorization callbacks', async () => {
  const source = await readPluginFile('includes/class-rest-controller.php');
  assert.match(source, /nattrix\/v1/);
  assert.match(source, /permission_callback/);
  assert.doesNotMatch(source, /'permission_callback'\s*=>\s*'__return_true'/);
  assert.match(source, /current_user_can\( 'manage_options' \)/);
  assert.match(source, /current_user_can\( 'edit_post', \$post_id \)/);
});
