# API and architecture alignment

This website is a client of Cix documentation, not an API specification. Before changing an endpoint, resource name, or control-plane claim, check the Cix repository’s current OpenAPI contract and API guide:

- [OpenAPI](https://git.home.arpa/itdlabs/cix/src/branch/master/docs/api/openapi.yaml)
- [API guide](https://git.home.arpa/itdlabs/cix/src/branch/master/docs/api/README.md)
- [Architecture source SVG](https://git.home.arpa/itdlabs/cix/src/branch/master/docs/architecture/architecture.svg)

The reproduced workflow remains captured from Cix commit `4d5f4ffa167520f0e4a64825b4c6c9a5a28942c7` (2026-09-01 20:07:21 +01:00). The current product contract reviewed for this website update is Cix commit `eb9d2479` (2026-09-11), including the unified package/image/deployment/host pipeline, image-readiness waits for deployments, explicit approval gates, rolling-rootfs freshness, Cix Build System dependencies built on a Cix host, and real release-signature selftest coverage.

The product-proof page records a real workflow using `GET /v1/system/site` and `PUT /v1/system/site`; its captured source revision is documented on [proof.html](../site/proof.html). The website’s local overview is deliberately a summary and remains linked to the canonical diagram and layer explanation.

## Maintenance rule

When the Cix API or architecture changes, update the website only after checking the source revision, then record the website change in `CHANGELOG.md`. Do not duplicate endpoint schemas here. The static checker verifies local references; the public-cutover checklist verifies external links and downloads.
