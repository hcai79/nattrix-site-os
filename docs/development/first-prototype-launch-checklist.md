# First Prototype Launch Checklist

The first prototype is a controlled CircuitsAtHome staging workflow, not a production publishing system. It proves the complete path from approved content plan to a human-reviewed WordPress staging draft with no live-site side effects.

## What is already built

- A reusable Site Blueprint, workbook import validation, source-evidence and media QA, human approval records, a mock model gateway, and an idempotent batch runner.
- A WordPress staging adapter that requires explicit staging writes, a safe HTTPS staging URL, a valid production hostname for comparison, and a human approval record.
- The Portfolio Engine v0.1 plugin package and a staging validation runbook.
- A CircuitsAtHome site blueprint and an onboarding record that deliberately authorizes no production write.

## Owner-provided inputs needed before the prototype

1. A CircuitsAtHome **staging clone URL**, not the production domain.
2. Confirmation that the staging backup can be restored.
3. A dedicated least-privilege WordPress account for staging drafts. Do not share owner credentials or store them in this repository.
4. The named human reviewer who can approve or return drafts.
5. One approved batch of up to five low-risk supporting-article topics. Start with supporting articles, not Core commercial pages or electrical-safety material.

## Prototype execution order

1. Complete the CircuitsAtHome onboarding record and validate it locally.
2. Install the reviewed Portfolio Engine package only on the staging clone and run the [staging validation](portfolio-engine-staging-validation.md).
3. Load a read-only inventory export and create an editable workbook with collision preview.
4. Choose one approved supporting article as the first smoke test, then expand to the approved five-item batch.
5. Use mock model fixtures unless the owner separately approves a bounded OpenRouter evaluation. CI and routine checks must remain offline.
6. Produce research, claim evidence, a visual manifest, Gutenberg blocks, and independent QA results.
7. Have the named reviewer record an approve or return decision using the [interim workflow](interim-reviewer-workflow.md).
8. Create a WordPress **staging draft**. Inspect the draft, rendered blocks, links, disclosure placement, and editor compatibility.
9. Schedule on staging only if the separate schedule approval is recorded. Do not publish to production during the prototype.

## Prototype exit criteria

- One draft reaches staging with a complete audit trail and no duplicate post on retry.
- The reviewer can return and re-approve a corrected draft.
- No production URL, canonical, redirect, taxonomy, affiliate treatment, navigation, plugin configuration, or content changes.
- The team has an evidence-backed decision about whether to run the five-item batch and whether a limited OpenRouter evaluation is worthwhile.

## Explicitly deferred

- Production publishing
- Supabase, dashboard, n8n, GSC, and AI-publishing automation
- Core commercial-page changes
- Electrical safety diagrams or unreviewed technical graphics
