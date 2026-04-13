/*==================== EXPERIENCE CALCULATION ====================*/
const startDate = new Date('2018-06-16');
const years = Math.floor((Date.now() - startDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
const experienceEl = document.getElementById('experienceYears');
if (experienceEl) experienceEl.textContent = years;

/*==================== MOBILE NAV ====================*/
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
}

if (navClose) {
  navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
}

// Close menu on link click
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
});

/*==================== ACTIVE NAV LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav__link[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.classList.add('nav__link--active');
      } else {
        link.classList.remove('nav__link--active');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

/*==================== HEADER SCROLL EFFECT ====================*/
const header = document.getElementById('header');

function handleHeaderScroll() {
  if (window.scrollY > 50) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
}

window.addEventListener('scroll', handleHeaderScroll);

/*==================== SCROLL TO TOP ====================*/
const scrollTopBtn = document.getElementById('scroll-top');

function handleScrollTop() {
  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('scroll-top--visible');
  } else {
    scrollTopBtn.classList.remove('scroll-top--visible');
  }
}

window.addEventListener('scroll', handleScrollTop);

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/*==================== DARK / LIGHT THEME ====================*/
const themeBtn = document.getElementById('theme-button');
const moonIcon = themeBtn.querySelector('.theme-icon--moon');
const sunIcon = themeBtn.querySelector('.theme-icon--sun');

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light-theme');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
  } else {
    document.body.classList.remove('light-theme');
    moonIcon.style.display = 'block';
    sunIcon.style.display = 'none';
  }
}

// Load saved theme (dark is default)
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  const current = document.body.classList.contains('light-theme') ? 'light' : 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
});

/*==================== CONTACT FORM (MAILTO) ====================*/
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const project = document.getElementById('contact-project').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  if (!name || !message) return;

  const body = encodeURIComponent(
    `Hi Rajneesh,\n\nI am ${name} (${email}). I have a project for you: ${project}.\n\nMessage: ${message}\n\nThanks,\n${name}`
  );

  window.open(
    `mailto:k.rajneesh.sharma@gmail.com?subject=Contact%20from%20Portfolio&body=${body}`,
    '_blank'
  );
});

/*==================== GITHUB CALENDAR ====================*/
if (typeof GitHubCalendar !== 'undefined') {
  GitHubCalendar('.calendar', 'rajneeshksharma', { responsive: true });
}

/*==================== GSAP ANIMATIONS ====================*/
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    // Hero animations (page load) — use fromTo to avoid CSS class conflicts
    gsap.fromTo('.hero__available', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.2 });
    gsap.fromTo('.hero__title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4 });
    gsap.fromTo('.hero__subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.7 });
    gsap.fromTo('.hero__actions', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.9 });
    gsap.fromTo('.hero__stats', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 1.1 });

    // Generic scroll-triggered fade-in
    document.querySelectorAll('.animate-in').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    });

    document.querySelectorAll('.animate-in--left').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    });

    document.querySelectorAll('.animate-in--right').forEach(el => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      });
    });

    // Hero stat count-up
    document.querySelectorAll('.hero__stat-number[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      gsap.to(el, {
        textContent: target,
        duration: 1.5,
        delay: 1.2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        onUpdate: function() {
          el.textContent = Math.round(parseFloat(el.textContent));
        }
      });
    });

    // AI stat count-up
    document.querySelectorAll('.ai__stat-number[data-count]').forEach(el => {
      const target = parseInt(el.dataset.count);
      gsap.to(el, {
        textContent: target,
        duration: 1.5,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        },
        onUpdate: function() {
          el.textContent = Math.round(parseFloat(el.textContent));
        }
      });
    });

    // Terminal typing effect
    const terminalBody = document.getElementById('terminal-body');
    if (terminalBody) {
      const lines = terminalBody.querySelectorAll('.terminal__line');
      lines.forEach(line => {
        line.style.opacity = '0';
      });

      ScrollTrigger.create({
        trigger: terminalBody,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          lines.forEach((line, i) => {
            gsap.to(line, {
              opacity: 1,
              duration: 0.3,
              delay: i * 0.25
            });
          });
        }
      });
    }

    // Tech stack: mouse parallax
    const stackItems = document.querySelectorAll('.stack__item');
    if (stackItems.length > 0) {
      document.querySelector('.stack')?.addEventListener('mousemove', (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

        stackItems.forEach((item, i) => {
          const depth = (i % 3 + 1) * 3;
          gsap.to(item, {
            x: x * depth,
            y: y * depth,
            duration: 0.5,
            ease: 'power2.out'
          });
        });
      });
    }

    // Nav background on scroll — use class toggle instead of inline style
    // so light theme CSS can override properly
    ScrollTrigger.create({
      trigger: '.hero',
      start: 'bottom top',
      onEnter: () => header.classList.add('header--scrolled'),
      onLeaveBack: () => header.classList.remove('header--scrolled')
    });

  } else {
    // Reduced motion: show everything immediately
    document.querySelectorAll('.animate-in, .animate-in--left, .animate-in--right').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    // Show stat values immediately
    document.querySelectorAll('[data-count]').forEach(el => {
      el.textContent = el.dataset.count;
    });

    // Show terminal lines
    const terminalBody = document.getElementById('terminal-body');
    if (terminalBody) {
      terminalBody.querySelectorAll('.terminal__line').forEach(line => {
        line.style.opacity = '1';
      });
    }
  }
}
