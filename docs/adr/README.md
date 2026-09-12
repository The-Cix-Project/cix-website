# Website ADRs

This directory records durable decisions about this website’s information architecture, evidence boundary, accessibility, deployment, and maintenance. It is not a copy of the Cix product ADR directory. Product behaviour remains authoritative in the Cix repository.

ADRs are numbered by the first accepted decision evidence in the website’s Git history. Amendments cite the original record and do not consume a new number. Each record includes status, date, evidence commit, decision, and consequences. Add the next number only for a new durable decision; update this index and the changelog in the same change.

## Decision timeline

| ADR | Date | First evidence | Decision |
| --- | --- | --- | --- |
| [0001](0001-static-no-build.md) | 2026-09-01 | `5f4f898` | Static, dependency-free site |
| [0002](0002-source-backed-product-story.md) | 2026-09-01 | `fd316fd` | Product story follows source evidence |
| [0003](0003-stable-public-paths.md) | 2026-09-01 | `fd316fd` | Stable public paths under the site document root |
| [0004](0004-managed-service-boundary.md) | 2026-09-01 | `43c3657` | Host policy, containerised protocol services |
| [0005](0005-factual-status-boundary.md) | 2026-09-01 | `7e493f3` | Evidence-calibrated status claims |
| [0006](0006-prebuilt-cache-trust-path.md) | 2026-09-01 | `a54d94b` | Prebuilt artefacts retain source authority |
| [0007](0007-evaluator-journey-information-architecture.md) | 2026-09-01 | `cc76564` | Homepage routes by evaluator intent |
| [0008](0008-reproduced-product-proof.md) | 2026-09-01 | `94a562c` | Reproducible product proof |
| [0009](0009-accessibility-and-focus-baseline.md) | 2026-09-02 | `f0f0b49` | Accessibility as release baseline |
| [0010](0010-secure-boot-and-human-tone.md) | 2026-09-02 | `b3c2020` | Precise security and human purpose |
| [0011](0011-readable-architecture-overview.md) | 2026-09-02 | `690b50a` | Readable overview alongside canonical diagram |
| [0012](0012-first-use-path.md) | 2026-09-02 | `31b9725` | Boot-to-first-action path |
| [0013](0013-quality-and-launch-gates.md) | 2026-09-02 | `354c7c3` | Automated quality and launch gates |
| [0014](0014-social-metadata.md) | 2026-09-02 | `22668ea` | Static, page-specific social metadata |
| [0015](0015-production-static-deployment.md) | 2026-09-02 | `26b8326` | Static TLS production endpoint |
| [0016](0016-source-map-and-decision-records.md) | 2026-09-02 | `ce5ce0a` | Local ownership map and ADR process |
| [0017](0017-separated-deployable-tree.md) | 2026-09-02 | `4603187` | Separate deployable site from engineering tooling |
| [0018](0018-approved-master-tagline.md) | 2026-09-03 | Issue `#25` | Approve “Systems, directly.” as the master tagline |

## History coverage

Not every commit creates a new architectural decision. These commits are retained in [`CHANGELOG.md`](../../CHANGELOG.md) and mapped here so the timeline is complete without manufacturing duplicate ADRs:

- `10cd04f` (2026-09-01) clarified Linux identity and capability copy under ADRs 0002–0003.
- `95aca1e` (2026-09-02) corrected the ADR 0011 diagram’s rendering.
- `364a173` (2026-09-02) corrected page layout only; it introduced no architectural decision.
