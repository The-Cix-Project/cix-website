# API and architecture alignment

This website is a client of Cix documentation, not an API specification. Before changing an endpoint, resource name, or control-plane claim, check the Cix repository’s current OpenAPI contract and API guide:

- [OpenAPI](https://github.com/The-Cix-Project/cix/blob/master/docs/api/openapi.yaml)
- [API guide](https://github.com/The-Cix-Project/cix/blob/master/docs/api/README.md)
- [Architecture source SVG](https://github.com/The-Cix-Project/cix/blob/master/docs/architecture/architecture.svg)
- [Website API/UI inventory](API-UI-INVENTORY.md)

The reproduced workflow remains captured from Cix commit `4d5f4ffa167520f0e4a64825b4c6c9a5a28942c7` (2026-09-01 20:07:21 +01:00). The current product contract reviewed for this website update is Cix commit `b7ece3b7` (2026-09-21), including the unified package/image/deployment/host pipeline, configuration documents with section-level diff/apply, the single management-address model, Cix’s own EFI boot manager, online data-directory partition growth, measured container disk usage, the shell/PBS recipe split with CPDL-backed builds, and the separate flat `cix-recipes` corpus. The source repositories also publish the Apache-2.0 licence, DCO contribution guide, and Cix trademark policy.

The product-proof page records a real workflow using `GET /v1/system/site` and `PUT /v1/system/site`; its captured source revision is documented on [proof.html](../site/proof.html). The website’s local overview is deliberately a summary and remains linked to the canonical diagram and layer explanation.

## Maintenance rule

When the Cix API or architecture changes, update the website only after checking the source revision and the [API/UI inventory](API-UI-INVENTORY.md), then record the website change in `CHANGELOG.md`. Do not duplicate endpoint schemas here. The static checker verifies local references; the public-cutover checklist verifies external links and downloads.
