# ADR 0013: Automate static quality and launch checks

- Status: Accepted
- Date: 2026-09-02
- Evidence: [`354c7c3`](https://github.com/The-Cix-Project/cix-website/commit/354c7c3)

## Decision

Run dependency-free checks for local links, assets, metadata, alt attributes, and size budgets in Gitea Actions. Keep deployment and public-cutover checks in a human-readable checklist.

## Consequences

Cheap regressions fail in CI, while external URLs, browser behaviour, release artefacts, and privacy/security decisions stay explicit human checks.
