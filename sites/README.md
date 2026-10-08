# Site Packages

Each portfolio site receives an isolated site package under `sites/<site-key>/` plus strategy documentation under `docs/sites/<site-key>/`.

Keep shared code and policies outside site packages. Keep site-specific positioning, approved categories, owner decisions, backlogs, and non-secret configuration inside them.

## Required site package files

- `README.md`: purpose, state, and local guardrails
- `site.example.yaml`: non-secret configuration contract
- `CODEX_PROJECT_MEMORY.md`: compact current context for future sessions
- `decision-log.md`: decisions and their rationale
- `backlog.md` or a structured backlog file: prioritized work, owner, status, and evidence

Copy `sites/_template/` for new sites. Do not copy a live WordPress database, media library, `.env`, or affiliate identifiers into this repository.
