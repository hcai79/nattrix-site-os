# Nattrix Site OS

A reusable operating system for managing and monetizing a portfolio of WordPress authority sites from one control plane.

## First implementation

The first production target is **CircuitsAtHome.com**.

The initial strategy is a focused electronics tools and test-equipment authority site built around a **Core 30** commercial-page model, with supporting informational content feeding traffic into those money pages.

## Architecture

- **WordPress**: public CMS and publishing layer
- **Portfolio Engine**: reusable WordPress plugin shared across sites
- **Next.js**: private portfolio dashboard
- **Supabase**: shared structured data and analytics layer
- **n8n**: workflow orchestration
- **Codex**: development and maintenance agent
- **Google Search Console / GA4**: SEO and performance inputs

## Initial specialist agents

1. Portfolio Manager
2. SEO Opportunity
3. Content Strategy
4. Research
5. Writer
6. SEO QA
7. Internal Linking
8. Monetization
9. Refresh

## Repository layout

```
agents/               Specialist agent contracts
apps/dashboard/       Private Next.js portfolio dashboard
wordpress/            Shared WordPress plugin
database/             Supabase schema and migrations
automations/          n8n workflows
packages/             Shared schemas, rules and types
docs/                 Architecture, roadmap and site strategies
```

## Development principle

CircuitsAtHome is the first implementation, not a one-off build. Shared functionality should be implemented generically so additional sites can be onboarded through configuration.

## Safety

Do not place production credentials, API keys, WordPress application passwords, affiliate credentials, or Supabase service keys in this repository.
