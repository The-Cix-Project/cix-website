# ADR 0001: Static, dependency-free site

- Status: Accepted
- Date: 2026-09-01
- Evidence: [`5f4f898`](https://github.com/The-Cix-Project/cix-website/commit/5f4f898)

## Decision

Use plain HTML, CSS, JavaScript, SVG, and a Python standard-library development server. Do not require a frontend build or package installation to develop or deploy the site.

## Consequences

The site can be inspected, copied to a tiny VM, and served by a conventional static web server. Shared behaviour remains explicit rather than hidden in a build pipeline.
