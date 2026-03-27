// ============================================
// COLLECTIVE DOMAIN - Main JavaScript
// ============================================

// Mobile navigation toggle
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Highlight active nav link based on current page filename
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';
  navLinks.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href === filename || (filename === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Image carousel
function initCarousels() {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    if (!track || slides.length === 0) return;

    let current = 0;
    const dots = [];

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Slide ' + (i + 1));
      dot.addEventListener('click', () => goTo(i));
      if (dotsContainer) dotsContainer.appendChild(dot);
      dots.push(dot);
    });

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    carousel.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    });
  });
}

// Lightbox for infographics
function initLightbox() {
  const items = document.querySelectorAll('.infographic-item');
  if (items.length === 0) return;

  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.style.cssText = [
    'display:none', 'position:fixed', 'inset:0', 'z-index:9999',
    'background:rgba(0,0,0,0.92)', 'align-items:center', 'justify-content:center',
    'cursor:pointer', 'padding:2rem'
  ].join(';');

  const lbImg = document.createElement('img');
  lbImg.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;cursor:default;';

  const lbClose = document.createElement('button');
  lbClose.innerHTML = '&times;';
  lbClose.setAttribute('aria-label', 'Close');
  lbClose.style.cssText = [
    'position:absolute', 'top:1rem', 'right:1.5rem',
    'background:none', 'border:none', 'color:white', 'font-size:2.5rem',
    'cursor:pointer', 'line-height:1', 'opacity:0.8'
  ].join(';');

  lb.appendChild(lbImg);
  lb.appendChild(lbClose);
  document.body.appendChild(lb);

  items.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (!img) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
      lb.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLb() {
    lb.style.display = 'none';
    document.body.style.overflow = '';
  }

  lb.addEventListener('click', e => { if (e.target === lb || e.target === lbClose) closeLb(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });
}

// Initialize everything on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initCarousels();
  initLightbox();
});
