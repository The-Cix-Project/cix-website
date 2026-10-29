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
name = installer["name"]
expected_name = "cix-installer-%s-%s-%s.iso" % (
    installer["version"], installer["release"], installer["arch"]
)
if name != expected_name:
    raise SystemExit(
        "update-release: cache identity disagrees with ISO name: "
        "%s != %s" % (name, expected_name)
    )
request = Request(installer["signature_url"], headers={"User-Agent": "cix-website-release-updater/1"})
with urlopen(request, timeout=30) as response:
    signature_sha256 = hashlib.sha256(response.read()).hexdigest()

with open(old_path, encoding="utf-8") as stream:
    release = json.load(stream)
release.update({
    "channel": "alpha",
    "version": installer["version"],
    "release": str(installer["release"]),
    "architecture": "x86-64" if installer["arch"] == "x86_64" else installer["arch"],
    "image_size": "%.1f MiB" % (installer["bytes"] / 1048576),
    "environment": "UEFI",
    "iso": name,
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

python3 - "$dir" <<'PY'
import json
import os
import re
import sys

site_dir = sys.argv[1]
with open(os.path.join(site_dir, "release.json"), encoding="utf-8") as stream:
    release = json.load(stream)

def replace_static(path):
    with open(path, encoding="utf-8") as stream:
        text = stream.read()

    for key in ("channel", "version", "release", "architecture", "image_size", "environment", "release_key", "release_key_id", "retired_key", "retired_key_since"):
        value = str(release[key])
        text = re.sub(
            r'(data-release="' + re.escape(key) + r'">)[^<]*',
            lambda match: match.group(1) + value,
            text,
        )

    def artifact(match):
        return release["signature"] if match.group(0).endswith(".minisig") else release["iso"]

    text = re.sub(r'cix-installer-[^"\s<]+\.iso(?:\.minisig)?', artifact, text)
    text = re.sub(
        r'(<dt>ISO SHA-256</dt><dd>)[0-9a-f]{32}<br>[0-9a-f]{32}(</dd>)',
        lambda match: match.group(1) + release["iso_sha256"][:32] + "<br>" + release["iso_sha256"][32:] + match.group(2),
        text,
    )
    text = re.sub(
        r'(<dt>Signature SHA-256</dt><dd>)[0-9a-f]{32}<br>[0-9a-f]{32}(</dd>)',
        lambda match: match.group(1) + release["signature_sha256"][:32] + "<br>" + release["signature_sha256"][32:] + match.group(2),
        text,
    )
    text = re.sub(r'(-p )cix-release-[^\s<]+\.pub', r'\1' + release["release_key"], text)
    text = re.sub(r'(data-release-key-file[^>]*href=")[^"]+', r'\1' + release["release_key"], text)
    text = re.sub(r'(data-retired-key-file[^>]*href=")[^"]+', r'\1' + release["retired_key"], text)

    temporary = path + ".tmp"
    with open(temporary, "w", encoding="utf-8") as stream:
        stream.write(text)
    os.replace(temporary, path)

for name in ("get.html", "trust.html"):
    path = os.path.join(site_dir, name)
    if os.path.exists(path):
        replace_static(path)
PY

# The production updater stores each archived website release under a directory
# named for the source commit. Publish that identity beside release.json so the
# live site can be checked without exposing deployment details in page copy.
commit=$(basename "$(dirname "$(dirname "$OUTPUT")")")
python3 - "$dir/build.json" "$commit" <<'PY'
import json
import os
import sys
from datetime import datetime, timezone

output, commit = sys.argv[1:]
temporary = output + ".tmp"
with open(temporary, "w", encoding="utf-8") as stream:
    json.dump({
        "commit": commit,
        "deployed_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
    }, stream, indent=2)
    stream.write("\n")
os.replace(temporary, output)
PY
echo "update-release: refreshed $OUTPUT" >&2
