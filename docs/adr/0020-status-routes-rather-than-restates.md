# ADR 0020: The status page routes to the roadmap rather than restating it

- Status: Accepted
- Date: 2026-09-12
- Supersedes: [ADR 0005](0005-factual-status-boundary.md)
- Evidence: Website issue #32

## Context

ADR 0005 made the status page a trust surface that separates shipped capability, verified behaviour, and explicit boundaries. The capability half was implemented as a six-row table restating what the Cix roadmap already records, with a source-revision stamp standing in for freshness.

The stamp is what failed. It was set to `eb9d2479` on 2026-09-11 and was 58 commits behind by the following day. The table itself had drifted with it: it named `/v1/diskroles`, a path the API does not declare, and its six badges carried no link to the evidence that established them.

This is the failure mode the Cix documentation map already names. The root Cix `README.md` is barred from carrying phase-status detail for exactly this reason — a duplicated status table is what drifted stale before. This website reproduced the pattern and got the same result, faster.

Re-syncing by hand is the discipline that already failed. The choice is between removing the duplication and mechanising the freshness check; a gate would make drift loud but still leaves a second copy that someone must reconcile on every product commit.

## Decision

The status page stops enumerating shipped capability. It keeps what it is uniquely positioned to carry:

- **Provenance** — the revision the page's boundaries were reviewed against, relabelled from "Evidence reviewed" to "Boundaries reviewed" to say what the stamp now covers.
- **Known boundaries** — the curated limits a reader needs before evaluating. These are editorial, not a copy of a roadmap table, and they are the page's reason to exist.
- **Evidence routes** — roadmap, ADRs, OpenAPI, and tests.

`docs/roadmap/ROADMAP.md` becomes the single route to what shipped and how it was verified. The badge legend is removed with the badges it explained.

## Consequences

There is one capability record, in the repository that owns it, so the page cannot contradict the product.

The stamp now ages much more slowly, because it covers boundaries rather than a capability list. Boundaries change when the platform's limits change, not on every commit. It is still a manual review and still needs one: the boundary list is the page's remaining drift risk, and a reviewer checks it against the roadmap at the stamped revision.

The page is shorter and reads as a route rather than a summary. A reader wanting a capability overview now leaves the website for the roadmap, which is the correct destination and was already the authority ADR 0002 and ADR 0003 established.

Issue #31, which asked for evidence links on each status badge, is resolved by this change: the badges it referred to no longer exist.
