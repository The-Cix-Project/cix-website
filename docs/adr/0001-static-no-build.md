# ADR 0001: Keep the site static and dependency-free

- Status: Accepted
- Date: 2026-09-02

## Decision

Use plain HTML, CSS, JavaScript, SVG, and Python’s standard-library development server. Do not require Node, a package manager, or a frontend build to develop or deploy the site.

## Consequences

The site is easy to inspect, copy to a tiny VM, and serve from Caddy or another static server. Shared behavior is explicit in `app.js` and `site-config.js`. Repeated markup is accepted where it keeps page URLs and source viewing straightforward; quality scripts catch drift.
