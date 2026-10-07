# Architecture

## Goal

Operate 5-6 SEO and monetization sites from one dashboard while keeping each public WordPress installation independent.

## Layers

### Public sites
Each site remains a separate WordPress installation.

Benefits:
- independent domains and databases
- easier resale or migration
- isolated operational risk
- site-specific plugin flexibility
- no dependency on WordPress Multisite

### Portfolio Engine
A shared WordPress plugin installed on participating sites.

Responsibilities:
- structured content models
- Core page metadata
- product records
- affiliate offer references
- reusable blocks
- REST endpoints
- internal-link hooks
- approval metadata
- revenue attribution tags

### Supabase
Central source of truth for portfolio-level operational data.

Initial domains:
- sites
- clusters
- content
- core pages
- keywords
- products
- offers
- rankings
- revenue
- tasks
- approvals

### Next.js dashboard
Private operating interface.

Initial views:
- Portfolio overview
- Site overview
- Core 30 tracker
- Publishing queue
- Opportunity queue
- Refresh queue
- Affiliate offer management
- Approval queue

### n8n
Workflow orchestration.

Examples:
- GSC -> opportunity scoring
- approved brief -> draft generation
- draft -> QA
- publish event -> internal-link discovery
- ranking decline -> refresh task

## Separation of concerns

WordPress handles public content and presentation.

Supabase handles portfolio operations, task state, cross-site analytics, and normalized monetization data.

n8n coordinates workflows.

The dashboard provides human control.

Codex builds and maintains the software.
