# TechVideoBlog Decision Log

| Date | Decision | Rationale | Owner / status |
| --- | --- | --- | --- |
| 2026-10-08 | Treat connected WordPress as production and default MCP usage to read-only. | Existing site has substantial published content and active production plugins. | Established, owner approval required to change. |
| 2026-10-08 | Keep TechVideoBlog in its own site package and documentation namespace. | Prevents its directory-specific strategy from leaking into reusable portfolio code. | Established. |
| 2026-10-08 | Do not install Portfolio Engine yet. | A staging path and compatibility audit are not yet confirmed. | Pending owner decision. |
| 2026-10-08 | Do not repair the Captions AI Review source link yet. | Its published URL is redirected to a 404, and no verified replacement exists. Changing the source link would conceal a production redirect or URL defect. | Pending owner-approved production diagnosis. |
