# Core-page internal-link audit

Use the read-only PowerShell audit to verify internal destinations linked from a bounded
set of Core pages. It fetches public URLs only. It does not authenticate to WordPress,
write production content, or follow redirects.

## Run a small batch first

```powershell
./scripts/test-core-page-internal-links.ps1 \
  -InventoryPath sites/techvideoblog/core/core-40.csv \
  -SiteUrl https://techvideoblog.com \
  -OutputPath sites/techvideoblog/audits/YYYY-MM-DD-core-40-links.csv \
  -MaxPages 5
```

Use the resulting CSV to identify reachable URLs and failures. Before any repair,
confirm that the source link is actually incorrect and that its proposed replacement
is the intended live destination.

For the next bounded batch, add `-SkipPages 5`; increase the skip value by the prior
batch size. This avoids an unbounded production crawl.

## Guardrails

- Keep the batch bounded and use the default throttle.
- Treat HTTP reachability as a routing check, not proof that the page matches intent.
- Never bulk-edit links from audit output.
- Preserve URLs, canonicals, taxonomy paths, affiliate links, and navigation unless
  the owner explicitly authorizes the specific change.
