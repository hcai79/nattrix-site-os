import { buildUrlInventory } from './inventory.js';

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
