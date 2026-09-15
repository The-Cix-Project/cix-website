# ADR 0014: Metadata is page-specific and static

- Status: Accepted
- Date: 2026-09-02
- Evidence: [`22668ea`](https://github.com/The-Cix-Project/cix-website/commit/22668ea)

## Decision

Every public page carries its own description, Open Graph title/description/type, and Twitter card metadata in the HTML head.

## Consequences

Search and social previews work on a static host without a build or runtime metadata service.
