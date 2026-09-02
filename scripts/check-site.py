#!/usr/bin/env python3
"""Dependency-free smoke checks for the static Cix site."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
import sys
import json
import re

REPO = Path(__file__).resolve().parents[1]
ROOT = REPO / "site"
PAGES = sorted(ROOT.glob("*.html"))
MAX_PAGE = 60_000
MAX_CSS = 70_000
MAX_JS = 25_000
MAX_ASSET = 2_000_000

class Page(HTMLParser):
    def __init__(self):
        super().__init__(); self.links=[]; self.images=[]; self.title=False; self.description=False
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag in ("a", "link") and a.get("href"): self.links.append(a["href"])
        if tag in ("script", "img"):
            key="src" if tag == "script" else "src"
            if a.get(key): self.links.append(a[key])
        if tag == "img": self.images.append(a)
        if tag == "title": self.title=True
        if tag == "meta" and a.get("name", "").lower() == "description" and a.get("content", "").strip(): self.description=True

def local_target(value):
    u=urlsplit(value)
    if u.scheme or u.netloc or value.startswith("#"): return None
    return (ROOT / u.path.lstrip("/")).resolve()

errors=[]
manifest = ROOT / "release.json"
if not manifest.exists():
    errors.append("site/release.json: release manifest is missing")
else:
    try:
        release = json.loads(manifest.read_text(encoding="utf-8"))
        required = {"version", "architecture", "image_size", "environment", "iso", "signature", "iso_sha256", "signature_sha256"}
        missing = required - release.keys()
        if missing: errors.append(f"site/release.json: missing fields {sorted(missing)}")
        for key in ("iso_sha256", "signature_sha256"):
            if key in release and not re.fullmatch(r"[0-9a-f]{64}", release[key]): errors.append(f"site/release.json: {key} must be a lowercase SHA-256")
    except (OSError, json.JSONDecodeError) as exc:
        errors.append(f"site/release.json: invalid JSON ({exc})")
for page in PAGES:
    if page.stat().st_size > MAX_PAGE: errors.append(f"{page.name}: page exceeds {MAX_PAGE} bytes")
    parser=Page(); parser.feed(page.read_text(encoding="utf-8"))
    if not parser.title: errors.append(f"{page.name}: missing title")
    if not parser.description: errors.append(f"{page.name}: missing meta description")
    for image in parser.images:
        if "alt" not in image: errors.append(f"{page.name}: image is missing alt text ({image.get('src','?')})")
    for ref in parser.links:
        target=local_target(ref)
        if target and not target.exists(): errors.append(f"{page.name}: missing local target {ref}")
    source = page.read_text(encoding="utf-8")
    if "web console" in source.lower(): errors.append(f"{page.name}: use canonical term 'web dashboard'")
    if "API first" in source: errors.append(f"{page.name}: use canonical term 'API-first'")

for pattern, limit in (("*.css", MAX_CSS), ("*.js", MAX_JS)):
    for asset in ROOT.glob(pattern):
        if asset.stat().st_size > limit: errors.append(f"{asset.name}: exceeds {limit} byte budget")
for asset in (ROOT / "assets").rglob("*"):
    if asset.is_file() and asset.stat().st_size > MAX_ASSET: errors.append(f"{asset.relative_to(ROOT)}: exceeds {MAX_ASSET} byte asset budget")

# Keep the checked-in brand reference self-contained too; it is not deployed,
# but broken swatches make the engineering reference misleading.
brand_doc = REPO / "docs/brand/guideline.md"
if brand_doc.exists():
    import re
    for ref in re.findall(r"!\[[^]]*\]\(([^)]+)\)", brand_doc.read_text(encoding="utf-8")):
        if not (brand_doc.parent / ref).exists(): errors.append(f"{brand_doc}: missing image {ref}")

if errors:
    print("SITE CHECK FAILED")
    print("\n".join(f"- {e}" for e in errors))
    sys.exit(1)
print(f"SITE CHECK OK: {len(PAGES)} pages, local links/assets, metadata, alt text, and budgets verified")
