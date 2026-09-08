# Changelog

All notable website changes are recorded here in reverse chronological order. Dates and commit identifiers are taken from Git history; this file describes the website repository, not the Cix product release stream.

## [Unreleased]

- Aligned architecture, services, resource, status, kernel example, and cache-client copy with current Cix sources: containers now declare `services[]`, `cix-init` supervises them, readiness is derived from service state, and individual service lifecycle actions are available. Kept the reproduced proof capture pinned to its original source revision and recorded the newer contract review in `docs/API-ALIGNMENT.md`.

## 2026-09-03

- `c9d48d0` Replaced the architecture overview with a presentation-ready, ownership-accurate map of API intent, host state, source/cache artefacts, Linux primitives, providers, workloads, and the verified A/B host; updated its page caption and accessible alternative.

- Approved “Systems, directly.” as the Cix master tagline and documented its required product lockup (issue #25).

## 2026-09-02

- `c5cff99` Aligned every Get Cix section to the shared page gutters.
- `4603187` Moved deployable pages/assets into `site/`, and the development server into `tools/`; updated checks and deployment paths.
- `04b4b7d` Reconciled the architectural decision timeline, changelog, diagram, and API references.
- `ce5ce0a` Documented source ownership and website ADRs.
- `364a173` Aligned the Get Cix install section with page gutters.
- `95aca1e` Fixed architecture overview aspect ratio and SVG text rendering.
- `26b8326` Added production Caddy deployment and security guidance.
- `22668ea` Added page-specific Open Graph and Twitter metadata.
- `354c7c3` Added static quality checks, Gitea Actions CI, and launch checklist.
- `31b9725` Added first-use manuals path to Get Cix.
- `690b50a` Added a readable architecture overview beside the canonical diagram.
- `b3c2020` Clarified Secure Boot support and added restrained human-purpose copy.
- `f0f0b49` Improved keyboard navigation and focus visibility.

## 2026-09-01

- `94a562c` Added reproduced CLI, REST, and dashboard product proof.
- `cc76564` Added homepage evaluator journeys.
- `a54d94b` Added the verified prebuilt installer and Cix Cache path.
- `7e493f3` Calibrated public project status claims.
- `43c3657` Explained the managed service/container boundary.
- `10cd04f` Clarified Linux identity and systems capabilities.
- `fd316fd` Established the mature product story and technical evidence pages.
- `5f4f898` Created the initial Cix website.
