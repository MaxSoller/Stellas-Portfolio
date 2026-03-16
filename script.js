// Lenis smooth scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Anchor links: let Lenis handle smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      lenis.scrollTo(target, { offset: -72 });
    }
  });
});

// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Scroll-based animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Section titles & content blocks — fade in
document.querySelectorAll('.section-title, .resume-content, .contact-content, .contact-intro').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// About section — slide in from sides
const aboutImage = document.querySelector('.about-image');
const aboutBody = document.querySelector('.about-body');
if (aboutImage) { aboutImage.classList.add('slide-in-left'); observer.observe(aboutImage); }
if (aboutBody) { aboutBody.classList.add('slide-in-right'); observer.observe(aboutBody); }

// Stagger project cards with scale-in
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.classList.add('scale-in');
  card.style.transitionDelay = `${i * 0.08}s`;
  observer.observe(card);
});

// Hero wave — reveal on scroll
const heroDivider = document.querySelector('.divider-hero');
if (heroDivider) observer.observe(heroDivider);

// Add hover overlays to project cards
document.querySelectorAll('.project-card .project-image').forEach(img => {
  const overlay = document.createElement('div');
  overlay.className = 'project-overlay';
  overlay.innerHTML = '<span>View Project →</span>';
  img.appendChild(overlay);
});

// --- Gallery logic (modal only) ---
function initGallery(container) {
  const slides = container.querySelectorAll('.gallery-slide');
  if (slides.length < 2) return null;

  const prevBtn = container.querySelector('.gallery-prev');
  const nextBtn = container.querySelector('.gallery-next');
  const dotsWrap = container.querySelector('.gallery-dots');
  let current = 0;

  dotsWrap.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Image ${i + 1}`);
    dot.addEventListener('click', (e) => { e.stopPropagation(); goTo(i); });
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    slides[current].classList.remove('active');
    dotsWrap.children[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsWrap.children[current].classList.add('active');
  }

  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current - 1); });
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goTo(current + 1); });

  return { goTo };
}

// Active nav link tracking
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });
}

// Navbar style on scroll — only toggle .scrolled on pages with a hero
const navbar = document.getElementById('navbar');
const hasHero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  if (hasHero) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  updateActiveNav();
});

// Parallax depth — uses Lenis scroll callback for smoothness
const parallaxElements = [
  { el: document.querySelector('.hero-content'), speed: 0.3 },
  { el: document.querySelector('.about-image img') || document.querySelector('.about-image'), speed: -0.15 },
  { el: document.querySelector('.bento-featured .project-image'), speed: -0.1 },
].filter(p => p.el);

lenis.on('scroll', ({ scroll }) => {
  for (const { el, speed } of parallaxElements) {
    const rect = el.getBoundingClientRect();
    const center = rect.top + rect.height / 2;
    const offset = (center - window.innerHeight / 2) * speed;
    el.style.transform = `translateY(${offset}px)`;
  }
});

// Project modal (only on pages with cards)
const modal = document.getElementById('project-modal');

if (modal) {
  const modalTitle = document.getElementById('modal-title');
  const modalImageWrap = document.getElementById('modal-image-wrap');
  const modalImage = document.getElementById('modal-image');
  const modalDots = document.getElementById('modal-dots');
  const modalDetails = document.getElementById('modal-details');
  const modalPrev = modal.querySelector('.modal-gallery-prev');
  const modalNext = modal.querySelector('.modal-gallery-next');
  let modalGallery = null;

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      modalTitle.textContent = card.querySelector('h3').textContent;

      // Check for gallery (multiple images)
      const slides = card.querySelectorAll('.gallery-slide');
      // Clean up previous modal gallery slides
      modalImageWrap.querySelectorAll('.gallery-slide').forEach(s => s.remove());

      if (slides.length > 1) {
        // Build modal gallery from card images
        modalImage.style.display = 'none';
        const srcs = Array.from(slides).map(s => s.src);
        srcs.forEach((src, i) => {
          const img = document.createElement('img');
          img.src = src;
          img.className = 'gallery-slide' + (i === 0 ? ' active' : '');
          img.style.borderRadius = '20px 0 0 20px';
          img.style.height = '100%';
          img.style.minHeight = '360px';
          img.style.width = '100%';
          img.style.objectFit = 'cover';
          modalImageWrap.insertBefore(img, modalPrev);
        });
        modalPrev.style.display = '';
        modalNext.style.display = '';
        modalDots.style.display = '';
        modalGallery = initGallery(modalImageWrap);
      } else {
        // Single image or placeholder
        modalPrev.style.display = 'none';
        modalNext.style.display = 'none';
        modalDots.style.display = 'none';
        modalImage.style.display = '';
        const img = card.querySelector('.project-image img');
        const placeholder = card.querySelector('.project-image-placeholder');
        if (img) {
          modalImage.style.backgroundImage = `url('${img.src}')`;
          modalImage.style.backgroundSize = 'cover';
          modalImage.style.backgroundPosition = 'center';
          modalImage.textContent = '';
        } else if (placeholder) {
          modalImage.style.backgroundImage = '';
          modalImage.textContent = placeholder.textContent;
        }
      }

      modalDetails.innerHTML = card.querySelector('.project-details').innerHTML;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    // Clean up modal gallery slides
    modalImageWrap.querySelectorAll('.gallery-slide').forEach(s => s.remove());
    modalImage.style.display = '';
    modalGallery = null;
  }
}
