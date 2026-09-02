# ADR 0002: Keep stable public paths at the repository root

- Status: Accepted
- Date: 2026-09-02

## Decision

Root-level pages such as `/get.html`, `/architecture.html`, and `/status.html` remain the public route contract. Internal documentation may be organized under `docs/`, but pages are not moved into a source directory without redirects and a deliberate migration.

## Consequences

The root can look flatter than an application repository, but direct links, bookmarks, static hosting, and the dependency-free server continue to work. The source map in `docs/README.md` supplies the missing ownership context.
