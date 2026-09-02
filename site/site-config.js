// Staging endpoints. Change these once at public-domain cutover.
window.CIX_SITE = Object.freeze({
  cacheBaseUrl: 'http://claude-code.uk.home.arpa:8080'
});

document.querySelectorAll('[data-cache-file]').forEach((link) => {
  link.href = `${window.CIX_SITE.cacheBaseUrl}/${link.dataset.cacheFile}`;
});

document.querySelectorAll('[data-cache-root]').forEach((link) => {
  link.href = `${window.CIX_SITE.cacheBaseUrl}/`;
});

document.querySelectorAll('[data-cache-help]').forEach((link) => {
  link.href = `${window.CIX_SITE.cacheBaseUrl}/#help`;
});
