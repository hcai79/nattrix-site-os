# Security and Secrets

## Never commit
- OpenAI API keys
- Supabase service-role keys
- WordPress Application Passwords
- Google OAuth secrets
- GSC credentials
- affiliate network credentials
- n8n credentials
- hosting credentials
- database passwords
- SSH keys

## Repository policy
Only placeholders belong in .env.example.

## WordPress
- use least-privilege application credentials
- protect REST endpoints with capability checks
- validate and sanitize request data
- escape output
- use nonces where appropriate for wp-admin operations

## Supabase
- use row-level security where applicable
- service-role keys must remain server-side
- do not expose privileged keys to Next.js client bundles

## Dashboard
- require authentication before portfolio data is exposed
- keep secrets server-side
- log sensitive actions
- add approval checks for production mutations

## Automation
n8n credentials belong in its credential store, not workflow exports committed to Git.
