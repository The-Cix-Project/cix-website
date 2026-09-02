# Website engineering map

The Cix website is a static site with stable public URLs. The apparent flatness at the repository root is deliberate: each root `*.html` file is a directly addressable page and must remain deployable without a build step.

| Area | Location | Responsibility |
| --- | --- | --- |
| Public pages | `*.html` at repository root | Stable routes and page content |
| Shared behavior | `app.js`, `site-config.js` | Navigation, cache endpoint substitution, small progressive enhancements |
| Shared presentation | `style.css` | Tokens, layout, responsive and focus states |
| Brand and UI assets | `assets/brand/`, `assets/icons/` | Approved marks and icon system |
| Diagrams and proof | `assets/diagrams/`, `assets/screens/` | Architecture overview and reproducible evidence |
| Development | `server.py` | Dependency-free local HTTP server only |
| Quality automation | `scripts/`, `.gitea/workflows/` | Link, metadata, accessibility-baseline, and budget checks |
| Deployment | `deploy/`, `docs/DEPLOYMENT.md` | Production web-server configuration and runbook |
| Decisions | `docs/adr/` | Accepted engineering decisions and consequences |

Do not move a public page into a source-only directory without a redirect or an explicit URL migration. Add new public assets to the appropriate asset area, and add a check when a new class of file needs validation.

The Cix repositories and their mission, architecture, guides, ADRs, code, OpenAPI contract, and Cix Cache remain the product authorities. This repository is an orientation and proof layer; it must not silently become a second specification.
