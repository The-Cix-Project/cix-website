# ADR 0019: Brand category language in metadata, plain definition in the hero

- Status: Accepted
- Date: 2026-09-12
- Evidence: Website issue #37; brand guidelines §Positioning and category

## Context

The brand guidelines fix the category: primary **systems distribution**, secondary **source-native infrastructure distribution**, with a recommended product line of “Cix — Systems, directly. — A source-native systems distribution with a C control plane, direct Linux primitives and one resource model for workloads, networks and hardware.”

The homepage led with “Open-source Linux operating system” in its `<title>`, meta description and hero eyebrow, while every page footer already read “Source-native systems. Directly.” The site therefore stated two different categories depending on where a reader looked, which ADR 0002 and the guidelines both forbid.

The two lines serve different readers. “Systems distribution” is the category Cix occupies and the language the guidelines require. “Open-source Linux operating system” is what a reader who has never heard of Cix needs in the first second on the page, and the guidelines’ own launch section asks the website to prove the product before it sells the philosophy.

## Decision

Split by surface rather than choosing one line for both.

- **Indexed and shared metadata carries the brand category.** The homepage `<title>` is “Cix — A source-native systems distribution”; the meta description and Open Graph description use the guidelines’ recommended descriptor. `og:title` stays “Cix — Systems, directly.”
- **The hero keeps the plain definition.** The eyebrow remains “Open-source Linux operating system”, with the tagline “Systems, directly.” as the headline immediately under it.

This is a deliberate departure from applying the category language uniformly, recorded here rather than left as drift.

## Consequences

Search results, link previews and the browser tab state the category the guidelines define. A first-time visitor still gets a plain-English definition above the fold, and reaches the category language one line later through the tagline and the footer.

The cost is that the page's first line and its title are not word-identical. That is acceptable while the two serve different readers; it is not licence to introduce a third framing. Any new category phrasing belongs in this ADR or supersedes it, and the guidelines remain the authority on the category itself.
