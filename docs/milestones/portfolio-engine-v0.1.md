# Milestone: Portfolio Engine v0.1

## Goal
Create the reusable WordPress foundation used by CircuitsAtHome first and future portfolio sites later.

## In scope
- plugin bootstrap
- Product custom post type
- Product Brand taxonomy
- Product Category taxonomy
- Core Page metadata model
- Affiliate Offer reference model
- REST API namespace
- capabilities and permissions
- validation and sanitization
- basic admin settings
- automated tests
- developer documentation

## Out of scope
- Supabase implementation
- Next.js dashboard implementation
- n8n workflows
- GSC integration
- AI article generation
- automatic publishing
- production deployment

## Architecture constraints
- nothing should be unnecessarily hard-coded to CircuitsAtHome
- affiliate URLs must not be hard-coded into article HTML
- public content remains in WordPress
- portfolio orchestration will later live outside WordPress
- production is not touched during this milestone

## Acceptance criteria
- plugin activates without fatal errors
- defined post types/taxonomies register correctly
- metadata validates and sanitizes
- REST endpoints require appropriate authorization
- tests cover reusable behaviors
- documentation explains data model and extension points
- Definition of Done is satisfied
