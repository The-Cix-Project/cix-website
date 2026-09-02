# ADR 0015: Production is a static TLS endpoint

- Status: Accepted
- Date: 2026-09-02
- Evidence: [`26b8326`](https://git.home.arpa/itdlabs/cix-website/commit/26b8326)

## Decision

Production uses a conventional static web server, with the supplied Caddy example defining TLS, compression, caching, and security headers. `server.py` remains development-only.

## Consequences

The site fits a tiny VM while retaining an explicit production security posture and a documented health check.
