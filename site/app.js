const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-nav');
const footer = document.querySelector('footer');
const mobileNavigation = window.matchMedia('(max-width: 980px)');

// Keep the public menu in one place. Pages retain a small static fallback, but
// the shared runtime normalises every page to the same order and active state.
const primaryLinks = [
  ['index.html', 'Home', 'The Cix overview: systems, directly.'],
  ['getting-started.html', 'Get started', 'The shortest path from installer to first useful workload.'],
  ['get.html', 'Download Cix', 'Verify the current installer and release artefacts.'],
  ['operate.html', 'Operate', 'Deployments, pipeline state, readiness, consoles, and updates.'],
  ['api.html', 'API', 'The REST/OpenAPI boundary for engineers and automation.'],
  ['build.html', 'Build', 'Recipes, verified artefacts, self-hosting, and delivery.'],
  ['resources.html', 'Resources', 'Containers, networks, storage, devices, and hardware limits.'],
  ['why.html', 'Why Cix', 'The operating model and the case for direct Linux primitives.'],
  ['architecture.html', 'Architecture', 'Ownership boundaries from client to kernel and workload.'],
  ['services.html', 'Services', 'API-owned DNS, LDAP, DHCP, NTP, and syslog providers.'],
  ['status.html', 'Project status', 'Shipped capability, evidence, and current boundaries.'],
  ['proof.html', 'Product proof', 'Reproduced CLI, REST, and dashboard evidence.'],
  ['sitemap.html', 'Sitemap', 'A plain map of every public website page.'],
  ['404.html', 'Not found', 'The fallback page for an unknown website address.'],
];
const navigationLinks = primaryLinks.filter(([href]) => !['index.html', 'operate.html', 'api.html', 'build.html', 'resources.html', 'sitemap.html', 'proof.html', '404.html'].includes(href));
const footerLinks = [
  ['https://github.com/The-Cix-Project/cix', 'Source'],
  ['https://github.com/The-Cix-Project/cix/blob/master/docs/README.md', 'Documentation'],
  ['https://github.com/The-Cix-Project/cix/blob/master/docs/api/openapi.yaml', 'API'],
  ['https://github.com/The-Cix-Project/cix/blob/master/LICENSE', 'Licence'],
  ['https://github.com/The-Cix-Project/cix/blob/master/CONTRIBUTING.md', 'Contribute'],
  ['https://github.com/The-Cix-Project/cix/blob/master/TRADEMARK.md', 'Brand policy'],
  ['sitemap.html', 'Sitemap'],
];

window.CIX_SITE_MAP = primaryLinks;

if (navigation) {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navigation.replaceChildren(...navigationLinks.map(([href, label]) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    if (href === currentPage) link.setAttribute('aria-current', 'page');
    return link;
  }), (() => {
    const link = document.createElement('a');
    link.className = 'nav-cta';
    link.href = 'https://github.com/The-Cix-Project/cix';
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

if (footer) {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const brand = document.createElement('a');
  brand.className = 'brand footer-brand';
  brand.href = 'index.html';
  brand.innerHTML = '<img src="assets/brand/cix-mark.svg" alt="" width="39" height="23"><span>cix</span>';

  const strapline = document.createElement('p');
  strapline.textContent = 'Source-native systems. Directly.';

  const links = document.createElement('div');
  footerLinks.forEach(([href, label]) => {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = label;
    if (href === currentPage) link.setAttribute('aria-current', 'page');
    links.append(link);
  });

  footer.replaceChildren(brand, strapline, links);
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
