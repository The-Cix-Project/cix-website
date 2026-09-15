# Changelog

All notable website changes are recorded here in reverse chronological order. Dates and commit identifiers are taken from Git history; this file describes the website repository, not the Cix product release stream.

## [Unreleased]

- Refreshed the public site against live Cix `v2.57.185` / source `f4392c86`: updated the host capture, current kernel-policy result, status provenance, configuration and management-address references, and corrected the boot-manager description. Kept the installer cache explicitly marked as LAN-only because no public cache endpoint is configured yet.
- Repointed source, documentation, cache-repository, licence, contribution, brand-policy, and website history links to the public GitHub mirrors under `The-Cix-Project`; staging cache service URLs remain unchanged.
- Replaced retired marketing language and honesty-signalling headings with mechanism-led wording, and added a checker guard for the brand avoid-list (issues #35 and #36).
- Replaced the illustrative homepage terminal with a verbatim capture from `192.168.15.95` on 2026-09-12: `cixctl health`, `cixctl boot`, and `cixctl kernel-policy show` (issue #38).
- Clarified LDAP security posture for issue #34: LDAPS and the daemon’s own TLS bind are available but opt-in; plaintext remains the honest default, and listener changes use explicit sequenced restarts.
- Published the source-side ownership foundation for cutover: Apache-2.0 under Omar Sakka’s copyright, DCO-based contributions, and a separate Cix trademark policy; added Licence, Contribute, and Brand policy links to the homepage footer.
- Documented the API/UI ownership boundary and endpoint inventory for the static site, and made release-manifest failures visible in browser diagnostics while retaining safe download fallbacks (issue #19).
- Added the missing PKI managed-service section and homepage route: documented the two-tier CA, pre-start certificate delivery, encrypted export/import, and reset redelivery against the seven `/v1/pki/*` API paths (issue #33).
- Aligned the service, API, and resource pages with Cix `5faa2e6c`: documented managed LDAP/LDAPS listeners and sequenced restarts, staged certificate redelivery after CA reset, and corrected the storage resource route to `/v1/storage-roles`.
- Removed the duplicated capability table from the project status page; it now routes to the Cix roadmap, keeps the curated boundaries and evidence routes, and stamps the revision its boundaries were reviewed against. Recorded as ADR 0020, superseding ADR 0005 (issues #32, #31).
- Moved the homepage `<title>`, meta description, and Open Graph description to the brand guidelines' category language, and kept the plain-English definition in the hero; recorded the split as ADR 0019 (issue #37).
- Settled on British `-ise` spelling across the site, the changelog, and the website ADRs, and added a check that enforces it; `docs/brand/` is excluded as a verbatim transcription of the owner's document.
- Completed the British spelling pass across prose: `behaviour`, `artefact`, and `enrolment`. CSS values (`center`) and HTML attributes are code and stay as they are.
- Moved the published installer to `2.55.16` and published `cix-release-2026-09.pub`, the key that signs release media from 2026-09-06 onward; `cix-release.pub` stays deployed so earlier ISOs remain verifiable, and Get Cix now explains the rotation.
- Fixed the rendered verification command, which emitted a literal `\n` instead of a shell line continuation and therefore did not run when pasted.
- Centralised the release key in `release.json` and added a check that every key it names is deployed, so an advertised key can no longer be missing or stale.
- Corrected the homepage storage resource to `/v1/storage-roles`; `/v1/diskroles` is not a declared path in the Cix OpenAPI contract.
- Restored the sentence dropped from the brand guideline transcription, which is now byte-identical to the owner's document in the Cix repository.
- Pointed the Get Cix static fallbacks at the current staging cache host instead of a stale address.
- Updated the product status and build path through Cix `eb9d2479`: documented on-box Cix Build System compilation with zstd/libarchive and the now-exercised minisign release-signature selftest, while keeping CBS daemon integration an explicit open boundary.
- Simplified the primary header to orientation pages; kept Operate, API, Build, Resources, and Sitemap discoverable through contextual links and the footer.
- Reconciled the sitemap with all 14 deployed HTML pages, including Home, Download Cix, Product proof, and the 404 utility page.
- Added a dynamic, old-school `sitemap.html` generated from the shared page map in `app.js`, and made that map the persistent footer discovery path.
- Centralised the primary navigation in `site/app.js` so every page exposes the same page order and active state; added a checker guard for missing shared-nav targets.
- Added `resources.html`, a practical resource and hardware overview covering workloads, networks, storage, volumes, device grants, isolation, and current verification boundaries.
- Added `build.html`, a source-to-host supply-chain overview covering recipes, isolated builds, verified cache artefacts, self-hosting, kernel/rootfs/ISO assembly, and delivery references.
- Added `api.html`, an engineer-facing entry point for the REST/OpenAPI boundary, client relationship, read/write model, authentication, and integration limits.
- Added `operate.html`, an operator-facing path covering deployments, the shared pipeline, readiness, consoles, rolling-rootfs freshness, persistent volumes, approval gates, and current security boundaries.
- Reflected Cix through `5c3b277d`: added the unified package/image/deployment/host pipeline, deployment image-readiness waits, explicit publish/roll/deploy gates, attributable audit records, and rolling-rootfs freshness to the status, architecture, and supply-chain copy. The reproduced proof capture remains pinned to its original source revision.

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
