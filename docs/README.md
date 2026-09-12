# Website engineering map

The Cix website is a static site with stable public URLs. Deployable files live in `site/`; the repository root contains engineering documentation, checks, deployment configuration, and tools.

| Area | Location | Responsibility |
| --- | --- | --- |
| Public pages | `site/*.html` | Stable routes and page content |
| Shared behaviour | `site/app.js`, `site/site-config.js` | Navigation, cache endpoint substitution, small progressive enhancements |
| Shared presentation | `site/style.css` | Tokens, layout, responsive and focus states |
| Brand and UI assets | `site/assets/brand/`, `site/assets/icons/` | Approved marks and icon system |
| Diagrams and proof | `site/assets/diagrams/`, `site/assets/screens/` | Architecture overview and reproducible evidence |
| Development | `tools/dev-server.py` | Dependency-free local HTTP server only |
| Quality automation | `scripts/`, `.gitea/workflows/` | Link, metadata, accessibility-baseline, and budget checks |
| Deployment | `deploy/`, `docs/DEPLOYMENT.md` | Production web-server configuration and runbook |
| Decisions | `docs/adr/` | Accepted engineering decisions and consequences |

Do not move a public page into a source-only directory without a redirect or an explicit URL migration. Add new public assets to the appropriate asset area, and add a check when a new class of file needs validation.

The Cix repositories and their mission, architecture, guides, ADRs, code, OpenAPI contract, and Cix Cache remain the product authorities. This repository is an orientation and proof layer; it must not silently become a second specification.
