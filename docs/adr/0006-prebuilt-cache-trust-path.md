# ADR 0006: Prebuilt artefacts retain source authority

- Status: Accepted
- Date: 2026-09-01
- Evidence: [`a54d94b`](https://git.home.arpa/itdlabs/cix-website/commit/a54d94b)

## Decision

Present Cix Cache as an optional, API-driven artefact path: recipes and checksums remain authoritative; verified prebuilt bytes avoid a rebuild; cache misses fall back to source. Installer downloads require independent signature verification.

## Consequences

Get Cix can offer a practical prebuilt install without implying that a binary registry replaces source truth.
