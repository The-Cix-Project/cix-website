const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-nav');
const mobileNavigation = window.matchMedia('(max-width: 980px)');

// Keep the public menu in one place. Pages retain a small static fallback, but
// the shared runtime normalizes every page to the same order and active state.
const primaryLinks = [
  ['getting-started.html', 'Get started'], ['operate.html', 'Operate'],
  ['api.html', 'API'], ['build.html', 'Build'], ['resources.html', 'Resources'],
  ['why.html', 'Why Cix'], ['architecture.html', 'Architecture'],
  ['services.html', 'Services'], ['status.html', 'Project status'],
];

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
