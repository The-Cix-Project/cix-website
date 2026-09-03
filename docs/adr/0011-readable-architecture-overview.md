# ADR 0011: Use a readable overview alongside the canonical diagram

- Status: Accepted
- Date: 2026-09-02
- Evidence: [`690b50a`](https://git.home.arpa/itdlabs/cix-website/commit/690b50a), amended by [`95aca1e`](https://git.home.arpa/itdlabs/cix-website/commit/95aca1e) and [`c9d48d0`](https://git.home.arpa/itdlabs/cix-website/commit/c9d48d0)

## Decision

The Architecture page presents a purpose-built overview with explicit ownership boundaries: client → REST/API control boundary → host-owned state and source/artefact pipeline → Linux primitives → workload/provider containers and the verified A/B host. The detailed Cix architecture SVG remains linked as the canonical source reference. The overview may summarize, but it must not assign provider responsibilities to `cixd` or omit the source, cache, identity/log, storage, and boot paths needed to understand the system.

## Consequences

The diagram is legible at page scale and as a standalone SVG, includes an accessible title/description and adjacent text alternative, and keeps detailed subsystem relationships in the Cix repository. Any future overview change must be checked against the canonical architecture SVG and API documentation before publication.
