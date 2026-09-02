# Cix website

Static, dependency-free marketing site for Cix.

## Develop locally

```sh
python3 server.py
```

Then open <http://127.0.0.1:8080>.

To make it reachable from another machine on the network:

```sh
python3 server.py --host 0.0.0.0 --port 8080
```

## Deploy

Serve this directory as static files with Caddy, nginx, or any static host. The
HTML pages, `style.css`, `app.js`, and `assets/` are required in production.

## Engineering map and decisions

- Source layout and ownership: [`docs/README.md`](docs/README.md)
- Website ADR index: [`docs/adr/README.md`](docs/adr/README.md)
- Website changelog: [`CHANGELOG.md`](CHANGELOG.md)
- API and diagram alignment: [`docs/API-ALIGNMENT.md`](docs/API-ALIGNMENT.md)
- Production deployment: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)
- Launch checklist: [`docs/LAUNCH-CHECKLIST.md`](docs/LAUNCH-CHECKLIST.md)

Durable engineering trade-offs belong in a numbered ADR. Product behavior remains governed by the Cix repositories; see ADR 0003 for the boundary.

## Source authorities

- Product truth: Cix mission, roadmap, architecture, guides, ADRs, code, and OpenAPI contract.
- Brand truth: `docs/brand/guideline.md` and the canonical SVG assets copied from Cix.
- The supplied brand reference files remain under `docs/brand/` and are not deployment assets.
