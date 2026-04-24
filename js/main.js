// ── NAVBAR SCROLL ──
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ── BURGER MENU ──
const burger = document.querySelector('.navbar__burger');
const mobileMenu = document.querySelector('.navbar__mobile');
if (burger && mobileMenu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = burger.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── ACTIVE NAV LINK ──
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar__nav a, .navbar__mobile a').forEach(link => {
  const href = link.getAttribute('href');
  if (href && (href === currentPage || (currentPage === 'index.html' && href === 'index.html'))) {
    link.classList.add('active');
  }
});

// ── FADE-IN ON SCROLL ──
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.15 }
);
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── COUNTER ANIMATION ──
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const isDecimal = String(target).includes('.');
  const suffix = el.dataset.suffix || '';
  const prefix = el.dataset.prefix || '';
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = target * eased;
    el.textContent = prefix + (isDecimal ? val.toFixed(1) : Math.floor(val)) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.animated) {
      e.target.dataset.animated = 'true';
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));

// ── CONTACT FORM ──
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'Message envoyé ✓';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}
