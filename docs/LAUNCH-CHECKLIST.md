# Cix website launch checklist

Use this checklist when the LAN staging addresses move to public infrastructure. Keep the website factual: if a check is not complete, leave the relevant boundary visible.

## Release and domain

- [ ] Point the production domain and `www` policy at the published site.
- [ ] Replace staging cache/source links in `site/site-config.js`, `site/get.html`, and navigation.
- [ ] Confirm HTTPS, certificate renewal, HSTS policy, and a safe redirect from HTTP.
- [ ] Confirm the public source repository, issue tracker, API specification, and brand assets are reachable.
- [ ] Confirm the current installer, detached signature, release key, and SHA-256 values from Cix Cache.

## Trust and operations

- [ ] Publish a security contact and vulnerability-reporting process.
- [ ] Decide and document analytics/privacy policy; ship no analytics by default unless reviewed.
- [ ] Confirm cache authentication, CORS, rate limits, and backup/retention policy.
- [ ] Run `python3 scripts/check-site.py` in CI and record the commit deployed.

## Browser and device QA

- [ ] Test Chromium, Firefox, and Safari at desktop and narrow mobile widths.
- [ ] Test keyboard navigation, visible focus, reduced motion, menu behaviour, and screen-reader names.
- [ ] Test download, signature, release-key, source, API, and manual links from a clean browser.
- [ ] Check architecture SVG and overview at normal scale, zoom, print, and grayscale.
- [ ] Verify no staging hostname, private IP, or unreleased claim remains in the public build.
