# ADR 0004: Make quality and accessibility release gates

- Status: Accepted
- Date: 2026-09-02

## Decision

Every change runs `python3 scripts/check-site.py`, which checks local links/assets, titles, descriptions, image alternatives, and practical size budgets. Browser checks cover keyboard navigation, focus, responsive layout, downloads, and diagrams before release.

## Consequences

The checker remains dependency-free and runs in Gitea Actions. It is intentionally a baseline, not a claim of complete WCAG conformance; manual and device checks remain in the launch checklist.
