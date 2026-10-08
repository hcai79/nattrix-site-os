# Definition of Done

A development task is not complete until:

- implementation matches the approved scope
- reusable logic is not unnecessarily site-specific
- tests are added or updated
- tests pass
- linting / static checks pass where configured
- public interfaces are documented
- migrations are included for schema changes
- no secrets are committed
- no production credentials are required for local tests
- security and permission implications are reviewed
- staging validation is documented where relevant
- production writes are not performed without approval
- unresolved questions are documented
- PR summary explains what changed and why

For WordPress work:
- sanitize inputs
- escape outputs
- check capabilities
- protect REST routes
- follow WordPress coding conventions

For dashboard work:
- validate inputs
- enforce authentication/authorization boundaries
- separate server-only secrets from client configuration
