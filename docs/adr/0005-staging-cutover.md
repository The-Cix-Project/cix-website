# ADR 0005: Separate LAN staging from public cutover

- Status: Accepted
- Date: 2026-09-02

## Decision

LAN source, cache, and download endpoints are allowed while the project is staged, but they must be centralized where possible, clearly labelled, and replaced as one controlled public cutover. Private hostnames and addresses must not survive into the public build.

## Consequences

`site-config.js` owns the cache base used by generated download links. The launch checklist requires a public-network link/download audit, TLS and header review, and a scan for staging endpoints before publication.
