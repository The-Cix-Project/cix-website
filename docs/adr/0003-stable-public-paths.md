# ADR 0003: Stable public paths under the site document root

- Status: Accepted
- Date: 2026-09-01
- Evidence: [`fd316fd`](https://git.home.arpa/itdlabs/cix-website/commit/fd316fd)

## Decision

Pages such as `/get.html`, `/architecture.html`, and `/status.html` are the public route contract, served from the `site/` document root. They are not moved or renamed within that document root without redirects and a deliberate migration.

## Consequences

The deployable tree is intentionally simple while the repository itself has separate `site/`, `docs/`, `scripts/`, `tools/`, and `deploy/` areas. Ownership is documented in [`docs/README.md`](../README.md).
