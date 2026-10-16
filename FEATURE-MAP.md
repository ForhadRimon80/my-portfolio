# Current functionality

| Public | Owner-only |
| --- | --- |
| Home and About | Token sign-in |
| Project list, search, filter and details | GitHub followers and repository counts |
| Toolbox list, search and categories | Estimated page reads |
| Links and contact | Portfolio project count |
| Theme and navigation search | Eight-hour signed session and sign-out |

Project content is edited in TypeScript data files. Contact uses Resend and rate limiting. Detailed read events use MongoDB and expire; aggregate counters remain. Statistics are server-rendered only after owner authentication; there is no public statistics data endpoint.
