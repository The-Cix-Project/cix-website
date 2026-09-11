const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-nav');
const mobileNavigation = window.matchMedia('(max-width: 980px)');

// Keep the public menu in one place. Pages retain a small static fallback, but
// the shared runtime normalizes every page to the same order and active state.
const primaryLinks = [
  ['getting-started.html', 'Get started', 'The shortest path from installer to first useful workload.'],
  ['operate.html', 'Operate', 'Deployments, pipeline state, readiness, consoles, and updates.'],
  ['api.html', 'API', 'The REST/OpenAPI boundary for engineers and automation.'],
  ['build.html', 'Build', 'Recipes, verified artifacts, self-hosting, and delivery.'],
  ['resources.html', 'Resources', 'Containers, networks, storage, devices, and hardware limits.'],
  ['why.html', 'Why Cix', 'The operating model and the case for direct Linux primitives.'],
  ['architecture.html', 'Architecture', 'Ownership boundaries from client to kernel and workload.'],
  ['services.html', 'Services', 'API-owned DNS, LDAP, DHCP, NTP, and syslog providers.'],
  ['status.html', 'Project status', 'Shipped capability, evidence, and current boundaries.'],
  ['sitemap.html', 'Sitemap', 'A plain map of every public website page.'],
];

window.CIX_SITE_MAP = primaryLinks;

if (navigation) {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navigation.replaceChildren(...primaryLinks.map(([href, label]) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    if (href === currentPage) link.setAttribute('aria-current', 'page');
    return link;
  }), (() => {
    const link = document.createElement('a');
    link.className = 'nav-cta';
    link.href = 'https://git.home.arpa/itdlabs/cix';
    link.innerHTML = 'View source <span aria-hidden="true">↗</span>';
    return link;
  })());
}

const siteMap = document.querySelector('#site-map');
if (siteMap) {
  siteMap.replaceChildren(...primaryLinks.map(([href, label, description], index) => {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    const note = document.createElement('span');
    note.textContent = description;
    item.append(index + 1 + '. ', link, ' — ', note);
    return item;
  }));
}

document.querySelectorAll('footer > div').forEach((footerLinks) => {
  if (footerLinks.querySelector('a[href="sitemap.html"]')) return;
  const link = document.createElement('a');
  link.href = 'sitemap.html';
  link.textContent = 'Sitemap';
  footerLinks.append(link);
});

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
