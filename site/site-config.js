// Staging endpoint. Release identity lives in release.json so one edit updates
// the download links, release strip, verification command, and checksums.
window.CIX_SITE = Object.freeze({ cacheBaseUrl: 'http://claude-code.uk.home.arpa:8080' });

const applyRelease = (release) => {
  const set = (key, value) => document.querySelectorAll(`[data-release="${key}"]`).forEach((node) => { node.textContent = value; });
  set('version', release.version); set('architecture', release.architecture); set('image_size', release.image_size); set('environment', release.environment); set('iso', release.iso); set('iso_sha256', release.iso_sha256); set('signature_sha256', release.signature_sha256);
  const command = document.querySelector('.verify-terminal pre code');
  if (command) command.textContent = `minisign -Vm \\n  ${release.iso} \\n  -p cix-release.pub`;
  const checksums = document.querySelectorAll('.verify-terminal dd');
  if (checksums[0]) checksums[0].textContent = release.iso_sha256;
  if (checksums[1]) checksums[1].textContent = release.signature_sha256;
  document.querySelectorAll('[data-cache-file]').forEach((link) => { link.href = `${window.CIX_SITE.cacheBaseUrl}/${link.dataset.cacheFile.endsWith('.minisig') ? release.signature : release.iso}`; });
  document.querySelectorAll('[data-cache-root]').forEach((link) => { link.href = `${window.CIX_SITE.cacheBaseUrl}/`; });
  document.querySelectorAll('[data-cache-help]').forEach((link) => { link.href = `${window.CIX_SITE.cacheBaseUrl}/#help`; });
};

fetch('release.json').then((response) => response.json()).then(applyRelease).catch(() => {
  document.querySelectorAll('[data-cache-file]').forEach((link) => { link.href = `${window.CIX_SITE.cacheBaseUrl}/${link.dataset.cacheFile}`; });
});
