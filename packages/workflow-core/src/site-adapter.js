import { buildUrlInventory } from './inventory.js';

import { isApprovedForContent } from './approvals.js';

export class MockSiteAdapter {
  constructor({ blueprint, urlRecords = [], categories = [] }) {
    if (!blueprint?.site_id || !blueprint?.domain) throw new Error('A site blueprint with site_id and domain is required');
    this.blueprint = structuredClone(blueprint);
    this.urlRecords = structuredClone(urlRecords);
    this.categories = structuredClone(categories);
  }

  async getSite() {
    return structuredClone({ site_id: this.blueprint.site_id, domain: this.blueprint.domain, status: this.blueprint.status });
  }

  async listUrlInventory() {
    return buildUrlInventory(this.urlRecords, this.blueprint.domain);
  }

  async listCategories() {
    return structuredClone(this.categories);
  }

  async createDraft() {
    throw new Error('MockSiteAdapter is read-only and cannot create drafts');
  }
}

export class StagingWordPressAdapter {
  constructor({ baseUrl, siteId, environment, fetchImpl = fetch, idempotencyStore = new Map() }) {
    if (!baseUrl || !siteId) throw new Error('baseUrl and siteId are required');
    if (environment !== 'staging') throw new Error('StagingWordPressAdapter only permits the staging environment');
    this.baseUrl = new URL(baseUrl);
    this.siteId = siteId;
    this.fetchImpl = fetchImpl;
    this.idempotencyStore = idempotencyStore;
  }

  async createDraft({ contentId, title, content, idempotencyKey, authorization, allowStagingWrites = false }) {
    if (!allowStagingWrites) throw new Error('Staging writes require explicit allowStagingWrites opt-in');
    if (!contentId || !title || !content || !idempotencyKey) throw new Error('contentId, title, content, and idempotencyKey are required');
    if (!authorization) throw new Error('Staging authorization must be supplied at runtime');
    if (this.idempotencyStore.has(idempotencyKey)) return structuredClone(this.idempotencyStore.get(idempotencyKey));

    const response = await this.fetchImpl(new URL('/wp-json/wp/v2/posts', this.baseUrl), {
      method: 'POST',
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
        'X-Nattrix-Site-Id': this.siteId,
        'X-Nattrix-Content-Id': contentId
      },
      body: JSON.stringify({ title, content, status: 'draft' })
    });
    if (!response.ok) throw new Error(`Staging draft request failed with ${response.status}`);
    const draft = await response.json();
    const result = { id: draft.id, status: draft.status, link: draft.link ?? null, contentId, idempotencyKey };
    this.idempotencyStore.set(idempotencyKey, result);
    return structuredClone(result);
  }

  async scheduleDraft({ contentId, postId, scheduledFor, approvalDecision, idempotencyKey, authorization, allowStagingWrites = false }) {
    if (!allowStagingWrites) throw new Error('Staging writes require explicit allowStagingWrites opt-in');
    if (!contentId || !Number.isInteger(postId) || postId < 1 || !idempotencyKey) throw new Error('contentId, postId, and idempotencyKey are required');
    if (!authorization) throw new Error('Staging authorization must be supplied at runtime');
    if (!isApprovedForContent(approvalDecision, contentId)) throw new Error('Scheduling requires a recorded human approval decision');
    const scheduleDate = new Date(scheduledFor);
    if (Number.isNaN(scheduleDate.valueOf()) || scheduleDate <= new Date()) throw new Error('scheduledFor must be a future ISO date');
    const scheduleKey = `schedule:${idempotencyKey}`;
    if (this.idempotencyStore.has(scheduleKey)) return structuredClone(this.idempotencyStore.get(scheduleKey));

    const response = await this.fetchImpl(new URL(`/wp-json/wp/v2/posts/${postId}`, this.baseUrl), {
      method: 'POST',
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
        'X-Nattrix-Site-Id': this.siteId,
        'X-Nattrix-Content-Id': contentId
      },
      body: JSON.stringify({ status: 'future', date: scheduleDate.toISOString() })
    });
    if (!response.ok) throw new Error(`Staging schedule request failed with ${response.status}`);
    const scheduled = await response.json();
    const result = { id: scheduled.id, status: scheduled.status, link: scheduled.link ?? null, contentId, idempotencyKey, scheduled_for: scheduleDate.toISOString() };
    this.idempotencyStore.set(scheduleKey, result);
    return structuredClone(result);
  }
}
