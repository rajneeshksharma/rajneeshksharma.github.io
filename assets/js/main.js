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

/*==================== GITHUB STATS + REPOS ====================*/
(function loadGitHubData() {
  const GH_USER = 'rajneeshksharma';
  const CACHE_KEY = 'gh_stats_v1';
  const CACHE_TTL = 6 * 60 * 60 * 1000; // 6h

  const LANG_COLORS = {
    JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
    HTML: '#e34c26', CSS: '#563d7c', SCSS: '#c6538c', Shell: '#89e051',
    Java: '#b07219', Go: '#00ADD8', Rust: '#dea584', PHP: '#4F5D95',
    Ruby: '#701516', C: '#555555', 'C++': '#f34b7d', 'C#': '#178600',
    Swift: '#F05138', Kotlin: '#A97BFF', Vue: '#41b883', Dart: '#00B4AB'
  };

  const statsEl = document.getElementById('github-stats');
  const reposEl = document.getElementById('github-repos');
  if (!statsEl) return;

  const setStat = (key, val) => {
    const el = statsEl.querySelector(`[data-stat="${key}"]`);
    if (el) el.textContent = val;
  };

  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));

  const renderRepos = (repos) => {
    if (!reposEl) return;
    if (!repos.length) {
      reposEl.innerHTML = '<div class="github__repos-loading">No public repositories found.</div>';
      return;
    }
    reposEl.innerHTML = repos.map(r => {
      const desc = r.description ? escapeHtml(r.description) : '<em style="opacity:0.6">No description</em>';
      const lang = r.language || '—';
      const color = LANG_COLORS[r.language] || 'var(--primary)';
      return `
        <a href="${escapeHtml(r.html_url)}" target="_blank" rel="noopener noreferrer" class="github__repo card">
          <span class="github__repo-name">${escapeHtml(r.name)}</span>
          <p class="github__repo-desc">${desc}</p>
          <div class="github__repo-meta">
            <span class="github__repo-lang" style="--lang-color:${color}">${escapeHtml(lang)}</span>
            <span class="github__repo-stars">★ ${r.stargazers_count}</span>
          </div>
        </a>
      `;
    }).join('');
  };

  const applyData = (data) => {
    setStat('repos', data.publicRepos);
    setStat('stars', data.totalStars);
    setStat('followers', data.followers);
    setStat('language', data.topLanguage || '—');
    renderRepos(data.topRepos);
  };

  // Try cache first
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (cached && (Date.now() - cached.t) < CACHE_TTL) {
      applyData(cached.d);
      return;
    }
  } catch (e) { /* ignore cache errors */ }

  Promise.all([
    fetch(`https://api.github.com/users/${GH_USER}`).then(r => r.ok ? r.json() : Promise.reject(r.status)),
    fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&sort=updated`).then(r => r.ok ? r.json() : Promise.reject(r.status))
  ]).then(([user, repos]) => {
    const ownRepos = repos.filter(r => !r.fork);

    const totalStars = ownRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

    const langCounts = {};
    ownRepos.forEach(r => { if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1; });
    const topLanguage = Object.keys(langCounts).sort((a, b) => langCounts[b] - langCounts[a])[0];

    const topRepos = [...ownRepos]
      .sort((a, b) => (b.stargazers_count - a.stargazers_count) || (new Date(b.pushed_at) - new Date(a.pushed_at)))
      .slice(0, 6);

    const data = {
      publicRepos: user.public_repos,
      totalStars,
      followers: user.followers,
      topLanguage,
      topRepos: topRepos.map(r => ({
        name: r.name,
        html_url: r.html_url,
        description: r.description,
        language: r.language,
        stargazers_count: r.stargazers_count
      }))
    };

    applyData(data);

    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d: data }));
    } catch (e) { /* ignore quota errors */ }
  }).catch(() => {
    if (reposEl) reposEl.innerHTML = '<div class="github__repos-loading">Unable to load GitHub data right now.</div>';
  });
})();

/*==================== GITHUB YEARLY CONTRIBUTIONS ====================*/
(function loadGitHubYears() {
  const GH_USER = 'rajneeshksharma';
  const CACHE_KEY = 'gh_years_v1';
  const CACHE_TTL = 6 * 60 * 60 * 1000;

  const yearsEl = document.getElementById('github-years');
  if (!yearsEl) return;

  const render = (years) => {
    if (!years.length) {
      yearsEl.innerHTML = '<div class="github__years-loading">No contribution data available.</div>';
      return;
    }
    yearsEl.innerHTML = years.map(({ year, count }) => `
      <a class="github__year" href="https://github.com/${GH_USER}?tab=overview&from=${year}-01-01&to=${year}-12-31" target="_blank" rel="noopener noreferrer">
        <span class="github__year-label">${year}</span>
        <span class="github__year-count">${count.toLocaleString()}</span>
        <span class="github__year-suffix">contribs</span>
      </a>
    `).join('');
  };

  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
    if (cached && (Date.now() - cached.t) < CACHE_TTL) {
      render(cached.d);
      return;
    }
  } catch (e) { /* ignore */ }

  fetch(`https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=all`)
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(data => {
      const totals = data.total || {};
      const years = Object.keys(totals)
        .filter(k => /^\d{4}$/.test(k))
        .map(y => ({ year: Number(y), count: totals[y] }))
        .sort((a, b) => b.year - a.year);

      render(years);

      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d: years }));
      } catch (e) { /* ignore quota */ }
    })
    .catch(() => {
      yearsEl.innerHTML = '<div class="github__years-loading">Unable to load yearly totals.</div>';
    });
})();

/*==================== GSAP ANIMATIONS ====================*/
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {

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
  }
}
