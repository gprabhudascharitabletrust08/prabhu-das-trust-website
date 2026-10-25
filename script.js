const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('open', !open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

const track = document.querySelector('.gallery-track');
const previous = document.querySelector('.gallery-prev');
const next = document.querySelector('.gallery-next');
if (track && previous && next) {
  const amount = () => Math.max(260, track.clientWidth * 0.78);
  previous.addEventListener('click', () => track.scrollBy({left: -amount(), behavior: 'smooth'}));
  next.addEventListener('click', () => track.scrollBy({left: amount(), behavior: 'smooth'}));
}

const revealTargets = document.querySelectorAll('.intro, .work-section, .founder, .gallery, .quote-band, .contact, .donation-panel');
if ('IntersectionObserver' in window) {
  revealTargets.forEach(el => el.classList.add('reveal-pending'));
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  revealTargets.forEach(el => observer.observe(el));
}
