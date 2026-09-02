const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#site-nav');
const mobileNavigation = window.matchMedia('(max-width: 980px)');

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
