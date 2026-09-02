# ADR 0011: Use a readable overview alongside the canonical diagram

- Status: Accepted
- Date: 2026-09-02
- Evidence: [`690b50a`](https://git.home.arpa/itdlabs/cix-website/commit/690b50a), amended by [`95aca1e`](https://git.home.arpa/itdlabs/cix-website/commit/95aca1e)

## Decision

The Architecture page presents a purpose-built overview with a clear client → API/control plane → Linux primitives → workload/host path. The detailed Cix architecture SVG remains linked as the canonical source reference.

## Consequences

The diagram is legible at page scale and has a text alternative, while detailed subsystem relationships remain available in the Cix repository.
