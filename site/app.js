const siteRoot = new URL('.', document.currentScript.src);
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-nav');
const footer = document.querySelector('footer');
const mobileNavigation = window.matchMedia('(max-width: 980px)');

// Keep the public menu in one place. Pages retain a small static fallback, but
// the shared runtime normalises every page to the same order and active state.
const primaryLinks = [
  ['index.html', 'Home', 'Cix on a dedicated container host.'],
  ['try.html', 'Try Cix', 'Choose a VM or a hardware trial and check agent access.'],
  ['getting-started.html', 'Get started', 'Boot the host and run a first container.'],
  ['get.html', 'Download Cix', 'Download the UEFI installer, signature and release key.'],
  ['trust.html', 'Trust and limits', 'Review agent permissions, isolation and release integrity.'],
  ['operate.html', 'Operate', 'Plan host upgrades, workload restarts and persistent state.'],
  ['api.html', 'API', 'Use REST or native MCP with directory-backed permissions.'],
  ['build.html', 'Build', 'Follow package outputs into the root image and boot slot.'],
  ['resources.html', 'Resources', 'Assign hardware, place volumes and adopt an existing filesystem.'],
  ['why.html', 'Why Cix', 'Decide whether the operating model fits your machine.'],
  ['architecture.html', 'Architecture', 'Trace a client request from cixd to the kernel.'],
  ['services.html', 'Services', 'Run directory, DNS, DHCP and time services in containers.'],
  ['status.html', 'Project status', 'Check installation requirements, compatibility and alpha limits.'],
  ['proof.html', 'Engineering notes', 'Inspect a host upgrade, agent permissions and a dashboard capture.'],
  ['contribute.html', 'Contribute', 'Report a result or prepare a signed-off patch.'],
  ['sitemap.html', 'Sitemap', 'Find every public page.'],
  ['404.html', 'Not found', 'Return to the site from a missing address.'],
];
const navigationLinks = primaryLinks.filter(([href]) => !['index.html', 'try.html', 'trust.html', 'operate.html', 'api.html', 'build.html', 'resources.html', 'sitemap.html', 'proof.html', 'contribute.html', '404.html'].includes(href));

window.CIX_SITE_MAP = primaryLinks;

if (navigation) {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navigation.replaceChildren(...navigationLinks.map(([href, label]) => {
    const link = document.createElement('a');
    link.href = new URL(href, siteRoot).href;
    link.textContent = label;
    if (href === currentPage) link.setAttribute('aria-current', 'page');
    return link;
  }), (() => {
    const link = document.createElement('a');
    link.className = 'nav-cta';
    link.href = 'https://github.com/The-Cix-Project/cix';
    link.innerHTML = 'View public source mirror <span aria-hidden="true">↗</span>';
    return link;
  })());
}

const siteMap = document.querySelector('#site-map');
if (siteMap) {
  siteMap.replaceChildren(...primaryLinks.map(([href, label, description], index) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = new URL(href, siteRoot).href;
    link.textContent = label;
    const note = document.createElement('span');
    note.textContent = description;
    item.append(index + 1 + '. ', link, ' — ', note);
    return item;
  }));
}

if (footer) {
  const currentPath = new URL(location.href).pathname;
  for (const link of footer.querySelectorAll('.footer-links a')) {
    if (link.origin === location.origin && link.pathname === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  }
}

function closeNavigation({ returnFocus = false } = {}) {
  if (!navigation?.classList.contains('open')) return;
  navigation.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (returnFocus) menuButton?.focus();
}

menuButton?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  if (isOpen) navigation.querySelector('a')?.focus();
});

navigation?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    closeNavigation();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeNavigation({ returnFocus: true });
});

document.addEventListener('pointerdown', (event) => {
  if (!event.target.closest('.site-header')) closeNavigation();
});

mobileNavigation.addEventListener('change', (event) => {
  if (!event.matches) closeNavigation();
});
