import { validateEvidencePack } from './evidence.js';
import { validateMediaManifest } from './media.js';
import { renderGutenbergDraft } from './gutenberg.js';

export function validateDraftPackage({ draft, evidencePack, mediaManifest } = {}) {
  const errors = [];
  if (!draft?.stable_content_id) errors.push({ code: 'content_id_missing' });
  if (!draft?.review_tier) errors.push({ code: 'review_tier_missing' });

  let blocks = null;
  try {
    blocks = renderGutenbergDraft(draft);
  } catch (error) {
    errors.push({ code: 'gutenberg_render_failed', message: error.message });
  }

  const evidence = validateEvidencePack(evidencePack);
  const media = validateMediaManifest({ ...(mediaManifest ?? {}), content_id: draft?.stable_content_id });
  const humanReviewReasons = [
    ...evidence.reviewTriggers.map((trigger) => trigger.reason),
    ...media.reviewQueue.map((item) => item.reason)
  ];

  return {
    valid: errors.length === 0 && evidence.valid && media.valid,
    readyForHumanReview: errors.length === 0 && evidence.publishable && media.valid,
    errors: [...errors, ...evidence.errors, ...media.errors],
    humanReviewReasons: [...new Set(humanReviewReasons)],
    blocks
  };
}
