# Codex Operating Rules

## Before coding
1. Read AGENTS.md.
2. Read README.md.
3. Read the relevant architecture and milestone docs.
4. Inspect existing implementation before proposing changes.

## During coding
- stay within the requested milestone
- do not implement unrelated roadmap items
- prefer reusable abstractions
- do not connect to production unless explicitly asked
- do not delete or rename production-facing structures without approval
- add tests as implementation is added
- document assumptions

## Before completion
- run relevant tests
- run lint/static checks where configured
- review the diff
- check for secrets
- document unresolved issues
- summarize changes in the PR

## Escalate instead of guessing when
- a change could affect production URLs
- a database migration is destructive
- security permissions are unclear
- requirements conflict with AGENTS.md
- a design decision materially changes the approved architecture
