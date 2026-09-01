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

## Source authorities

- Product truth: Cix mission, roadmap, architecture, guides, ADRs, code, and OpenAPI contract.
- Brand truth: `docs/brand/guideline.md` and the canonical SVG assets copied from Cix.
- The supplied brand reference files remain under `docs/brand/` and are not deployment assets.
