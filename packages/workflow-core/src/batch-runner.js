import { transition, retryFrom } from './state-machine.js';
import { isApprovedForContent } from './approvals.js';

export class BatchRunner {
  constructor({ batchId, siteId, maxItems = 5 }) {
    if (!batchId || !siteId) throw new Error('batchId and siteId are required');
    if (!Number.isInteger(maxItems) || maxItems < 1 || maxItems > 5) throw new Error('maxItems must be an integer from 1 to 5');
    this.batchId = batchId;
    this.siteId = siteId;
    this.maxItems = maxItems;
    this.jobs = new Map();
  }

  enqueue(items, { actor }) {
    if (!actor) throw new Error('An actor is required to queue a batch');
    if (!Array.isArray(items) || !items.length || items.length > this.maxItems) throw new Error(`A batch must contain 1 to ${this.maxItems} items`);
    const identifiers = new Set(items.map((item) => item.stable_content_id));
    if (identifiers.size !== items.length || [...identifiers].some((id) => !id)) throw new Error('Each queued item needs a unique stable_content_id');
    if (items.some((item) => item.site_id !== this.siteId)) throw new Error('All items must belong to the batch site');

    return items.map((item) => {
      const existing = this.jobs.get(item.stable_content_id);
      if (existing) return existing;
      let job = { id: item.stable_content_id, batch_id: this.batchId, site_id: this.siteId, state: 'site_onboarded', history: [] };
      for (const state of ['inventory_ready', 'research_ready', 'strategy_proposed', 'strategy_approved', 'plan_exported', 'plan_imported_or_approved', 'batch_queued']) {
        job = transition(job, state, { actor, approval: state === 'strategy_approved' });
      }
      this.jobs.set(job.id, job);
      return job;
    });
  }

  advance(contentId, nextState, options) {
    const job = this.jobs.get(contentId);
    if (!job) throw new Error(`Unknown content item: ${contentId}`);
    const { qualityGate, approvalDecision, ...transitionOptions } = options ?? {};
    if (nextState === 'qa_passed' && qualityGate?.readyForHumanReview !== true) {
      throw new Error('qa_passed requires a successful draft quality gate');
    }
    if (['approved', 'scheduled'].includes(nextState) && !isApprovedForContent(approvalDecision, contentId)) {
      throw new Error(`${nextState} requires a recorded approval decision for this content item`);
    }
    if (['approved', 'scheduled'].includes(nextState)) transitionOptions.approval = true;
    const updated = transition(job, nextState, transitionOptions);
    this.jobs.set(contentId, updated);
    return updated;
  }

  returnForCorrection(contentId, state, options) {
    const job = this.jobs.get(contentId);
    if (!job) throw new Error(`Unknown content item: ${contentId}`);
    const updated = retryFrom(job, state, options);
    this.jobs.set(contentId, updated);
    return updated;
  }

  snapshot() {
    return [...this.jobs.values()].map((job) => structuredClone(job));
  }
}
