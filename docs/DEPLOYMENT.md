# Production deployment

The site is static. A small VM needs only a web server, the checked-out commit, and a TLS-capable DNS name. Keep `tools/dev-server.py` for local development; use the supplied Caddy example for production.

## Caddy on a tiny VM

For a new Debian VM, the supplied installer performs the complete setup:

```sh
git clone https://github.com/The-Cix-Project/cix-website.git
cd cix-website
sudo ./deploy/install-vm.sh --domain=example.com
```

It clones the public repository into a bare local mirror, validates each new
commit with `scripts/check-site.py`, switches the served `site/` directory
atomically, installs a five-minute systemd update timer, and configures Caddy.
It configures both `example.com` and `www.example.com`. Use `--branch=` if the
VM should follow a branch other than `master`. The installer preserves an
existing Caddyfile before replacing it.

For manual installation instead:

1. Check out the reviewed commit into `/srv/cix-website` and make it readable by the web-server user.
2. Replace `cix.example.org` in [`deploy/Caddyfile`](../deploy/Caddyfile) with the public hostname and set the site root.
3. Point DNS at the VM, install Caddy, copy the file to its configuration directory, and reload the service.
4. Caddy obtains and renews TLS automatically when ports 80 and 443 reach the VM.

The configuration enables zstd/gzip compression, short HTML caching, immutable asset caching, and restrictive security headers. Review the Content-Security-Policy if a future release adds an external integration.

## Health check and release

The static health check is the existing `status.html` route. Invalid paths use the branded `404.html` fallback in production and local development:

```sh
curl --fail --silent --show-error --location https://cix.example.org/status.html >/dev/null
python3 scripts/check-site.py
```

Deploy only after both checks pass. Record the deployed Git commit and verify `get.html`, the detached signature, release key, source/API links, and the Cix Cache endpoint from a clean browser. Do not publish LAN hostnames or private IP addresses; complete [`LAUNCH-CHECKLIST.md`](LAUNCH-CHECKLIST.md) before public cutover.

## Local development

No Caddy, Node, or package installation is needed locally:

```sh
python3 tools/dev-server.py --host 0.0.0.0 --port 8765
```

This intentionally remains a development server and must not be exposed as the production TLS endpoint.
