# Branching and Pull Request Rules

## Default branch
main

## Development model
- substantive work should happen on feature branches
- do not commit large implementation changes directly to main
- one milestone or cohesive feature per branch when practical

## Branch naming
Examples:
- feat/portfolio-engine-products
- feat/core-page-model
- feat/supabase-schema
- fix/rest-permissions
- docs/editorial-templates

## Pull requests
Each PR should include:
- purpose
- scope
- architecture decisions
- files changed
- tests run
- security considerations
- migration notes
- screenshots where UI changes exist
- unresolved questions
- rollback notes when relevant

## Merge policy
Prefer review before merge for milestone work.
Do not enable automatic production deployment from main until deployment controls are explicitly designed.
