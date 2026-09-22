# API/UI inventory

Reviewed against Cix source commit `65b21996` on 2026-09-22.

This repository is a static orientation and proof layer. It does not implement a
Cix API client, proxy API responses, or duplicate OpenAPI schemas. The deployed
pages contain human-facing route labels and links to the source contract; the
actual Cix dashboard lives in the Cix repository.

## Runtime ownership

| Surface | Owns | Does not own |
| --- | --- | --- |
| `site/app.js` | Shared navigation order, active-page state, sitemap rendering, footer sitemap fallback | Cix resources, API requests, authentication, or endpoint schemas |
| `site/site-config.js` | Release manifest substitution, verification command, cache/download links | Release selection and verification; production `release.json` is refreshed by the deployment updater |
| `site/release.json` | Checked-in fallback and production-generated version, artefact names, checksums, active and retired release-key filenames | Artefact bytes or signature verification |
| Cix source repository | OpenAPI, API behaviour, dashboard, CLI, tests, roadmap, and ADRs | Website presentation |

## Endpoint labels

The website currently labels only these API resources. Each label is an
orientation hint, not a schema claim; the linked OpenAPI contract is authoritative.

| Website surface | Label | OpenAPI path |
| --- | --- | --- |
| Homepage resource model | Containers | `/v1/containers` |
| Homepage resource model | Networks | `/v1/networks` |
| Homepage resource model | Devices | `/v1/devices` |
| Homepage resource model | Software | `/v1/pkg` |
| Resources page | Storage | `/v1/storage-roles` |
| Services page | LDAP users | `/v1/ldap/users` |
| Services page | DNS records | `/v1/dns/records` |
| Services page | DHCP | `/v1/dhcp` |
| Services page | NTP | `/v1/system/ntp` |
| Services page | Syslog targets | `/v1/syslog/targets` |
| Services page | PKI | `/v1/pki/ca`, `/v1/pki/intermediate`, `/v1/pki/certs`, `/v1/pki/certs/{name}`, `/v1/pki/export`, `/v1/pki/import`, `/v1/pki/reset` |
| API page | Configuration document | `/v1/config`, `/v1/config/diff` |
| API page | Management address | `/v1/system/management-address` |
| Resources page | Volume usage | `/v1/volumes/{name}/usage` |

The product-proof page is a recorded workflow, not a live API call. Its
`GET /v1/system/site` and `PUT /v1/system/site` examples remain pinned to the
capture revision documented on the page.

## Diagnostic rule

The only fetch performed by this site loads `release.json`. A failed manifest
load keeps safe fallback download links but logs a namespaced warning in the
browser console, so a remote browser session can distinguish a manifest failure
from a broken page or cache endpoint.
