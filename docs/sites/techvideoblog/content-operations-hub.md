# TechVideoBlog Content Operations Hub

## Purpose

The Google Sheet “TechVideoBlog Operations Hub” is the operational view for content
inventory, QA state, and VA assignments. It is separate from the historical planning
workbook so routine work does not disturb source material. Durable research, audit
findings, and engineering contracts remain in this repository.

## Tabs

| Tab | Owner | Use |
| --- | --- | --- |
| Content Hub | Portfolio manager | Inventory of published and planned content, with role, QA status, next action, priority, task status, assignee, primary Core target, and planned publish date. |
| VA Queue | Portfolio manager and VA | Bounded tasks with a required output, approval boundary, and safety note. |
| Dashboard | Everyone | Current counts, decision queue, and the immediate operating picture. |
| Read Me | Everyone | The workflow, research standard, statuses, and non-negotiable production safeguards. |

The legacy “TechvideoBlog Content Plan and Strategy” workbook remains historical source
material. Do not treat its legacy URLs, dates, titles, or estimates as current without
verification.

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

## Planned content protocol

Planned supporting Posts use a `PLAN-TVB-###` Content ID. Their URL stays blank until
publication, while the proposed slug, planned publish date, and exactly one Primary
Core Target make the queue schedulable and reviewable.

The initial plan schedules one informational Post per day for 40 consecutive days.
Every planned Post supports one distinct Core 40 page with a single natural contextual
link. A task may be assigned only after the VA provides a research and draft brief that
does not add pricing, testing, feature, or product claims without current primary-source
evidence. The plan is a controlled backlog, not authorization to publish.

Use the [supporting Post brief template](supporting-post-brief-template.md) for every
`PLAN-TVB-###` assignment. A completed brief moves to **Review**, never directly to
production.

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
