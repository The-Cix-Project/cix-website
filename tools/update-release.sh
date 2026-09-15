#!/bin/sh
set -eu

# Refresh the website manifest from the Cix Cache selector. The cache
# repository owns selection and signing policy; this wrapper adds the
# website's key metadata and hashes the detached signature.

LATEST_ISO="${LATEST_ISO:-}"
CACHE_BASE="${CACHE_BASE:-https://cache.cix.world}"
OUTPUT="${OUTPUT:-}"

for arg in "$@"; do
	case "$arg" in
		--latest-iso=*) LATEST_ISO=${arg#*=} ;;
		--cache-base=*) CACHE_BASE=${arg#*=} ;;
		--output=*) OUTPUT=${arg#*=} ;;
		*) echo "update-release: unknown option: $arg" >&2; exit 2 ;;
	esac
done

[ -n "$LATEST_ISO" ] || { echo "update-release: --latest-iso is required" >&2; exit 2; }
[ -n "$OUTPUT" ] || { echo "update-release: --output is required" >&2; exit 2; }
[ -x "$LATEST_ISO" ] || { echo "update-release: not executable: $LATEST_ISO" >&2; exit 1; }

dir=$(dirname "$OUTPUT")
[ -d "$dir" ] || { echo "update-release: no such directory: $dir" >&2; exit 1; }
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT INT TERM

"$LATEST_ISO" --base="$CACHE_BASE" --arch=x86_64 --format=json > "$work/latest.json"

python3 - "$work/latest.json" "$OUTPUT" "$CACHE_BASE" "$work/release.json" <<'PY'
import hashlib
import json
import sys
from urllib.request import Request, urlopen

latest_path, old_path, _base, out_path = sys.argv[1:]
with open(latest_path, encoding="utf-8") as stream:
    installers = json.load(stream)["installers"]
if len(installers) != 1:
    raise SystemExit("update-release: expected exactly one x86_64 installer")

installer = installers[0]
request = Request(installer["signature_url"], headers={"User-Agent": "cix-website-release-updater/1"})
with urlopen(request, timeout=30) as response:
    signature_sha256 = hashlib.sha256(response.read()).hexdigest()

with open(old_path, encoding="utf-8") as stream:
    release = json.load(stream)
release.update({
    "channel": "beta",
    "version": installer["version"],
    "architecture": "x86-64" if installer["arch"] == "x86_64" else installer["arch"],
    "image_size": "%.1f MiB" % (installer["bytes"] / 1048576),
    "environment": "UEFI",
    "iso": installer["name"],
    "signature": installer["signature_name"],
    "iso_sha256": installer["sha256"],
    "signature_sha256": signature_sha256,
})

with open(out_path, "w", encoding="utf-8") as stream:
    json.dump(release, stream, indent=2)
    stream.write("\n")
PY

chmod 644 "$work/release.json"
mv -f "$work/release.json" "$OUTPUT"
echo "update-release: refreshed $OUTPUT" >&2
