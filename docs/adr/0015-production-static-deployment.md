# ADR 0015: Production is a static TLS endpoint

- Status: Accepted
- Date: 2026-09-02
- Evidence: [`26b8326`](https://git.home.arpa/itdlabs/cix-website/commit/26b8326)

## Decision

Production uses a conventional static web server rooted at `site/`, with the supplied Caddy example defining TLS, compression, caching, and security headers. `tools/dev-server.py` remains development-only.

## Consequences

The site fits a tiny VM while retaining an explicit production security posture and a documented health check.
