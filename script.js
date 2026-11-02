/* PERSONALIZE AQUI — substitua os campos vazios antes de publicar. */
const PROFILE = {
  linkedin: 'https://www.linkedin.com/in/lucas-gomes-borges/',
  github: '', // Exemplo: 'https://github.com/seu-usuario'
  email: '',  // Exemplo: 'contato@seudominio.com'
};

for (const type of ['linkedin', 'github', 'email']) {
  document.querySelectorAll(`[data-link="${type}"]`).forEach(link => {
    const value = PROFILE[type]?.trim();
    if (!value) {
      link.hidden = true;
      return;
    }
    link.hidden = false;
    link.href = type === 'email' ? `mailto:${value}` : value;
  });
}

const themeButton = document.querySelector('.theme-toggle');
const savedTheme = (() => { try { return localStorage.getItem('lg-theme'); } catch (_) { return null; } })();
if (savedTheme === 'light' || savedTheme === 'dark') document.documentElement.dataset.theme = savedTheme;
function updateThemeLabel() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  themeButton?.setAttribute('aria-label', isDark ? 'Ativar tema claro' : 'Ativar tema escuro');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#0b1216' : '#f8f9f4');
}
updateThemeLabel();
themeButton?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('lg-theme', next); } catch (_) {}
  updateThemeLabel();
});

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function setMenu(open) {
  mobileNav.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}
menuButton?.addEventListener('click', () => setMenu(mobileNav.hidden));
mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
window.addEventListener('keydown', event => { if (event.key === 'Escape' && mobileNav && !mobileNav.hidden) setMenu(false); });

const filterButtons = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filterButtons.forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  projectCards.forEach(card => { card.hidden = selected !== 'all' && !card.dataset.category.split(' ').includes(selected); });
}));

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
