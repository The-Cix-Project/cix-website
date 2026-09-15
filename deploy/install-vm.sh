#!/bin/sh
set -eu

# Install the Cix website on a Debian VM and keep it updated from GitHub.
# Run as root:
#   ./deploy/install-vm.sh --domain=www.example.com

REPO_URL="https://github.com/The-Cix-Project/cix-website.git"
BRANCH="master"
REPO_DIR="/srv/cix-website.git"
SITE_DIR="/srv/cix-site"
UPDATE_SCRIPT="/usr/local/sbin/cix-website-update"
SERVICE_FILE="/etc/systemd/system/cix-website-update.service"
TIMER_FILE="/etc/systemd/system/cix-website-update.timer"
CADDYFILE="/etc/caddy/Caddyfile"
DOMAIN=""

usage() {
	cat >&2 <<'EOF'
Usage: install-vm.sh --domain=HOSTNAME

Installs the public Cix website on a Debian VM and follows the master branch.
The hostname must already resolve to this VM before Caddy can obtain a public
certificate.
EOF
}

for arg in "$@"; do
	case "$arg" in
		--domain=*) DOMAIN=\${arg#--domain=} ;;
		--branch=*) BRANCH=\${arg#--branch=} ;;
		--repo-url=*) REPO_URL=\${arg#--repo-url=} ;;
		--help|-h) usage; exit 0 ;;
		*) echo "install-vm.sh: unknown option: $arg" >&2; usage; exit 2 ;;
	esac
done

if [ "$(id -u)" -ne 0 ]; then
	echo "install-vm.sh: run as root" >&2
	exit 1
fi

if [ -z "$DOMAIN" ]; then
	echo "install-vm.sh: --domain=HOSTNAME is required" >&2
	usage
	exit 2
fi

case "$DOMAIN" in
	*[^A-Za-z0-9.-]*) echo "install-vm.sh: invalid hostname: $DOMAIN" >&2; exit 2 ;;
	.*|*.) echo "install-vm.sh: invalid hostname: $DOMAIN" >&2; exit 2 ;;
esac

if ! command -v apt-get >/dev/null 2>&1; then
	echo "install-vm.sh: this installer requires Debian's apt-get" >&2
	exit 1
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y git python3 ca-certificates curl gnupg debian-keyring \
	debian-archive-keyring apt-transport-https

if ! command -v caddy >/dev/null 2>&1; then
	curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
		| gpg --dearmor --yes -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
	curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
		> /etc/apt/sources.list.d/caddy-stable.list
	chmod o+r /usr/share/keyrings/caddy-stable-archive-keyring.gpg
	chmod o+r /etc/apt/sources.list.d/caddy-stable.list
	apt-get update
	apt-get install -y caddy
fi

install -d -m 0755 "$SITE_DIR/releases"

if [ -d "$REPO_DIR" ]; then
	if ! git --git-dir="$REPO_DIR" rev-parse --is-bare-repository >/dev/null 2>&1; then
		echo "install-vm.sh: $REPO_DIR exists but is not a bare Git repository" >&2
		exit 1
	fi
	git --git-dir="$REPO_DIR" fetch --quiet origin "$BRANCH:refs/heads/$BRANCH"
else
	git clone --bare "$REPO_URL" "$REPO_DIR"
	git --git-dir="$REPO_DIR" fetch --quiet origin "$BRANCH:refs/heads/$BRANCH"
fi

cat > "$UPDATE_SCRIPT" <<'EOF'
#!/bin/sh
set -eu

repo=__REPO_DIR__
root=__SITE_DIR__
branch="__BRANCH__"

git --git-dir="$repo" fetch --quiet origin "$branch:refs/heads/$branch"
commit=$(git --git-dir="$repo" rev-parse "refs/heads/$branch")
release="$root/releases/$commit"

if [ ! -d "$release" ]; then
	temporary="$root/releases/.$commit.new"
	test ! -e "$temporary"
	mkdir "$temporary"
	git --git-dir="$repo" archive "refs/heads/$branch" | tar -x -C "$temporary"
	python3 "$temporary/scripts/check-site.py"
	mv "$temporary" "$release"
fi

ln -sfn "$release/site" "$root/current.next"
mv -Tf "$root/current.next" "$root/current"
chmod -R a+rX "$release"
EOF
sed -i \
	-e "s#__REPO_DIR__#$REPO_DIR#g" \
	-e "s#__SITE_DIR__#$SITE_DIR#g" \
	-e "s#__BRANCH__#$BRANCH#g" \
	"$UPDATE_SCRIPT"
chmod 0755 "$UPDATE_SCRIPT"

cat > "$SERVICE_FILE" <<EOF
[Unit]
Description=Update the Cix website from GitHub

[Service]
Type=oneshot
ExecStart=$UPDATE_SCRIPT
EOF

cat > "$TIMER_FILE" <<'EOF'
[Unit]
Description=Check for Cix website updates

[Timer]
OnBootSec=2min
OnUnitActiveSec=5min
Persistent=true

[Install]
WantedBy=timers.target
EOF

if [ -e "$CADDYFILE" ] && [ -s "$CADDYFILE" ] &&
	! grep -q 'Managed by cix-website installer' "$CADDYFILE"; then
	cp -a "$CADDYFILE" "$CADDYFILE.pre-cix-website.$(date +%s)"
fi

cat > "$CADDYFILE" <<EOF
# Managed by cix-website installer.
$DOMAIN {
	root * $SITE_DIR/current/site
	encode zstd gzip

	header {
		Content-Security-Policy "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; connect-src 'self' http: https:; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"
		Referrer-Policy "strict-origin-when-cross-origin"
		X-Content-Type-Options "nosniff"
		X-Frame-Options "DENY"
		Permissions-Policy "camera=(), microphone=(), geolocation=()"
		Strict-Transport-Security "max-age=31536000; includeSubDomains"
		Cache-Control "public, max-age=300"
	}

	@immutable path /assets/* /cix-release*.pub
	header @immutable Cache-Control "public, max-age=31536000, immutable"

	file_server

	handle_errors {
		@not_found expression {http.error.status_code} == 404
		rewrite @not_found /404.html
		file_server
	}
}
EOF

"$UPDATE_SCRIPT"
caddy validate --config "$CADDYFILE"
systemctl daemon-reload
systemctl enable --now cix-website-update.timer
systemctl enable caddy
systemctl restart caddy

echo "Cix website installed at https://$DOMAIN"
echo "Following GitHub branch: $BRANCH"
echo "Manual update: systemctl start cix-website-update.service"

