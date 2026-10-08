# TechVideoBlog Decision Log

| Date | Decision | Rationale | Owner / status |
| --- | --- | --- | --- |
| 2026-10-08 | Treat connected WordPress as production and default MCP usage to read-only. | Existing site has substantial published content and active production plugins. | Established, owner approval required to change. |
| 2026-10-08 | Keep TechVideoBlog in its own site package and documentation namespace. | Prevents its directory-specific strategy from leaking into reusable portfolio code. | Established. |
| 2026-10-08 | Do not install Portfolio Engine yet. | A staging path and compatibility audit are not yet confirmed. | Pending owner decision. |
| 2026-10-08 | Do not repair the Captions AI Review source link yet. | Its published URL is redirected to a 404, and no verified replacement exists. Changing the source link would conceal a production redirect or URL defect. | Pending owner-approved production diagnosis. |
| 2026-10-08 | Hold changes to the Video Stabilization AI post's misdirected outbound link. | An anchor presented as TechVideoBlog's directory points to an unrelated external domain. The intended destination is not certain enough for a silent replacement. | Pending owner confirmation. |
| 2026-10-08 | Allow bounded production repairs for verified internal links and narrow formatting or structure improvements. | The owner authorized live changes only when they are reversible, source-supported, verified after publication, and recorded in `worklog.md`. This does not authorize URL, redirect, canonical, taxonomy, navigation, plugin, global-style, affiliate, analytics, or external-system changes. | Established, constrained authorization. |
