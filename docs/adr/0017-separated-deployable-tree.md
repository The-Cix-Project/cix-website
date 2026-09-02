# ADR 0017: Separate deployable site from engineering tooling

- Status: Accepted
- Date: 2026-09-02
- Evidence: [`4603187`](https://git.home.arpa/itdlabs/cix-website/commit/4603187)

## Decision

Keep all public pages, shared CSS/JavaScript, release key, and runtime assets under `site/`. Keep validation under `scripts/`, the dependency-free development server under `tools/`, deployment examples under `deploy/`, and engineering records under `docs/`.

## Consequences

The repository root is understandable at a glance, production servers use `site/` as their document root, and public URLs remain unchanged. The development server and checker explicitly target the deployable tree.
