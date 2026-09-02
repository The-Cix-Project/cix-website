# ADR 0003: Stable root-level public paths

- Status: Accepted
- Date: 2026-09-01
- Evidence: [`fd316fd`](https://git.home.arpa/itdlabs/cix-website/commit/fd316fd)

## Decision

Root pages such as `/get.html`, `/architecture.html`, and `/status.html` are the public route contract. They are not moved into a source directory without redirects and a deliberate migration.

## Consequences

The repository is intentionally flat at its public boundary. Internal ownership and file responsibilities are documented in [`docs/README.md`](../README.md).
