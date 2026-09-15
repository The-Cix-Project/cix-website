// The cache is still a LAN staging endpoint. Release identity lives in release.json so one edit updates
// the download links, release strip, verification command, checksums, and the
// release key the command pins.
window.CIX_SITE = Object.freeze({ cacheBaseUrl: 'http://claude-code.uk.home.arpa:8080' });

const applyRelease = (release) => {
  const set = (key, value) => document.querySelectorAll(`[data-release="${key}"]`).forEach((node) => { node.textContent = value; });
  set('version', release.version); set('architecture', release.architecture); set('image_size', release.image_size); set('environment', release.environment); set('iso', release.iso); set('iso_sha256', release.iso_sha256); set('signature_sha256', release.signature_sha256);
  set('release_key', release.release_key); set('release_key_id', release.release_key_id); set('retired_key', release.retired_key); set('retired_key_since', release.retired_key_since);
  const command = document.querySelector('.verify-terminal pre code');
  // A real shell continuation: backslash then newline. This used to emit a
  // literal "\n", so the one command the page exists to be copied from did
  // not run when pasted.
  if (command) command.textContent = `minisign -Vm \\\n  ${release.iso} \\\n  -p ${release.release_key}`;
  const checksums = document.querySelectorAll('.verify-terminal dd');
  if (checksums[0]) checksums[0].textContent = release.iso_sha256;
  if (checksums[1]) checksums[1].textContent = release.signature_sha256;
  document.querySelectorAll('[data-release-key-file]').forEach((link) => { link.href = release.release_key; });
  document.querySelectorAll('[data-retired-key-file]').forEach((link) => { link.href = release.retired_key; });
  document.querySelectorAll('[data-cache-file]').forEach((link) => { link.href = `${window.CIX_SITE.cacheBaseUrl}/${link.dataset.cacheFile.endsWith('.minisig') ? release.signature : release.iso}`; });
  document.querySelectorAll('[data-cache-root]').forEach((link) => { link.href = `${window.CIX_SITE.cacheBaseUrl}/`; });
  document.querySelectorAll('[data-cache-help]').forEach((link) => { link.href = `${window.CIX_SITE.cacheBaseUrl}/#help`; });
};

fetch('release.json').then((response) => {
  if (!response.ok) throw new Error(`release.json returned HTTP ${response.status}`);
  return response.json();
}).then(applyRelease).catch((error) => {
  console.warn('[cix] release manifest unavailable; using static download fallbacks', error);
  document.querySelectorAll('[data-cache-file]').forEach((link) => { link.href = `${window.CIX_SITE.cacheBaseUrl}/${link.dataset.cacheFile}`; });
});
