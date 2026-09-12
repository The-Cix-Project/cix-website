# ADR 0016: Document ownership and decisions locally

- Status: Accepted
- Date: 2026-09-02
- Evidence: [`ce5ce0a`](https://git.home.arpa/itdlabs/cix-website/commit/ce5ce0a)

## Decision

Keep website ADRs under `docs/adr/`, use the index as navigation and process guidance, and document file ownership in `docs/README.md`. Website ADRs summarise website choices; Cix product ADRs remain authoritative for Cix behaviour.

## Consequences

The deployable site is separated cleanly from engineering documentation and tooling without changing its public routes or duplicating product specifications.
