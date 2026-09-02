# Website ADRs

Architecture Decision Records explain decisions that affect the website’s engineering, information architecture, or public claims. They are intentionally short and are not a replacement for Cix product ADRs.

| ADR | Decision | Status |
| --- | --- | --- |
| [0001](0001-static-no-build.md) | Keep the site static and dependency-free | Accepted |
| [0002](0002-stable-public-paths.md) | Keep public HTML routes at the repository root | Accepted |
| [0003](0003-source-authority-and-proof.md) | Treat Cix source and captured evidence as authorities | Accepted |
| [0004](0004-quality-and-accessibility-gates.md) | Make quality and accessibility checks release gates | Accepted |
| [0005](0005-staging-cutover.md) | Separate LAN staging from public cutover | Accepted |

When a change introduces a durable trade-off, add the next numbered ADR before or alongside the implementation. Update this index and link the relevant issue or commit.
