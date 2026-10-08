# TechVideoBlog Content Operations Hub

## Purpose

The Google Sheet “TechvideoBlog Content Plan and Strategy” is the operational view for
content inventory, QA state, and VA assignments. Durable research, audit findings, and
engineering contracts remain in this repository.

## Tabs

| Tab | Owner | Use |
| --- | --- | --- |
| Content Hub | Portfolio manager | Inventory of all published Pages and Posts, with role, QA status, next action, priority, task status, and assignee. |
| VA Queue | Portfolio manager and VA | Bounded tasks with a required output, approval boundary, and safety note. |
| Operations Guide | Everyone | The workflow, research standard, statuses, and non-negotiable production safeguards. |
| Keywords, Links Proifle, Indexing pages, Link building 1 | Historical planning | Preserve as source material. Do not treat their legacy URLs, dates, titles, or estimates as current without verification. |

## Sync contract

1. Refresh the local inventory before updating Content Hub.
2. Use the WordPress source ID as Content ID. Do not create duplicate rows for the
   same published item.
3. Add evidence references to the repository path or an approved research record.
4. Update QA status and next action after each bounded audit.
5. Create VA work in VA Queue only when its outcome and owner-approval boundary are
   explicit.
6. Record any production write in both the site worklog and the relevant Content Hub
   row after verification.

## Status definitions

- **Backlog:** Inventory item not yet prioritized.
- **Ready:** Bounded, non-production research or QA can begin.
- **In progress:** An assignee is currently working it.
- **Blocked:** An owner decision or external evidence is required.
- **Review:** Work is awaiting editorial or owner review.
- **Complete:** Evidence and verification are recorded.

## Guardrails

The hub does not authorize production changes. Do not publish, delete, or alter URLs,
canonicals, redirects, taxonomy, navigation, plugins, global styles, affiliate links,
analytics, or external systems from a VA task without the owner’s explicit approval.
