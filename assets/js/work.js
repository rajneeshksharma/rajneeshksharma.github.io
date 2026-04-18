/* ==================== WORK SECTION — DATA + LOGIC ==================== */

const PROJECTS = [
  {
    number: '01',
    title: 'MyWorth.ai',
    tagline: 'AI-powered wealth management & asset tracking SaaS',
    status: 'LIVE',
    flagship: true,
    accent: 'primary',
    tags: ['FinTech SaaS', 'AI-Powered', 'Asset Management'],
    metrics: [
      { value: '500+', label: 'assets parsed by AI', verify: true },
      { value: '40%',  label: 'faster onboarding',   verify: true },
      { value: '3',    label: 'user roles',          verify: true }
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'AWS', 'Stripe', 'Claude AI'],
    links: { live: 'https://dev.myworth.ai', github: null },
    problem: 'Individuals and families lacked a secure, centralized platform to track, manage, and share their complete financial asset portfolio.',
    solution: 'Built a full-stack fintech SaaS with AI-powered document extraction, drag-and-drop upload, asset distribution analytics, collaborator sharing, and premium subscription billing.',
    impact: 'Users can upload any asset document and have it auto-parsed by AI, view portfolio distribution charts, and securely share access with family or advisors.',
    image: null
  },
  {
    number: '02',
    title: 'AI Voice Agent Platform',
    tagline: 'White-label outbound AI calling for Indian SMBs',
    status: 'IN_DEV',
    flagship: true,
    accent: 'secondary',
    tags: ['AI/ML', 'Voice AI', 'White-Label'],
    metrics: [
      { value: '150–200', label: 'calls/day per agent', verify: false },
      { value: '<₹10K',   label: '/mo per-agent cost',  verify: false },
      { value: '2',       label: 'languages (Hindi+EN)', verify: false }
    ],
    tech: ['Asterisk', 'Node.js', 'AWS Lambda', 'DynamoDB', 'Deepgram', 'Lex V2'],
    links: { live: null, github: null },
    problem: 'Indian enterprises lacked an affordable, multilingual AI calling solution for lead qualification, appointment booking, and follow-ups.',
    solution: 'Building a white-label outbound AI calling platform using self-hosted Asterisk + Pipecat + Deepgram STT + Amazon Lex V2 + Polly TTS, with a serverless AWS pipeline for campaign management.',
    impact: 'Enables enterprises to deploy AI voice agents at sub-₹10K/month, handling 150–200 calls/day with natural Hindi + English conversations and automated CRM updates.',
    image: null
  },
  {
    number: '03',
    title: 'Fluxiontek RAG Chatbot',
    tagline: 'Enterprise RAG chatbot over 10K+ internal docs',
    status: 'LIVE',
    flagship: false,
    accent: 'accent',
    tags: ['AI/ML', 'RAG Pipeline', 'Enterprise'],
    metrics: [
      { value: '10K+',   label: 'docs indexed',   verify: true },
      { value: '<400ms', label: 'p95 response',   verify: true }
    ],
    tech: ['Python', 'Chainlit', 'LangChain', 'OpenAI', 'Pinecone', 'FastAPI'],
    links: { live: null, github: null },
    problem: 'Enterprise teams needed an AI assistant that could answer questions from thousands of internal documents with accurate citations.',
    solution: 'Built a RAG pipeline with chunked document ingestion, hybrid search (dense + keyword), and a Chainlit chat UI with citation links back to source documents.',
    impact: 'Employees get answers in seconds across 10K+ documents, with citation-backed responses that teams can trust for decision-making.',
    image: null
  },
  {
    number: '04',
    title: 'Kangaroo Propane',
    tagline: 'Real-time propane delivery e-commerce with live tracking',
    status: 'LIVE',
    flagship: false,
    accent: 'accent-warm',
    tags: ['E-commerce', 'Real-Time', 'Maps'],
    metrics: [
      { value: 'iOS+Android', label: 'mobile apps',        verify: false },
      { value: 'Live',        label: 'GPS delivery track', verify: false }
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Google Maps', 'Firebase', 'Braintree'],
    links: { live: 'https://kangaroopropane.com', github: null },
    problem: 'Propane delivery services lacked real-time order tracking, leading to poor customer experience and manual stock management.',
    solution: 'Built a full e-commerce platform with live map-based delivery tracking, Firebase push notifications, Braintree payments, and an efficient inventory management system.',
    impact: 'Customers can now track deliveries in real-time on iOS and Android, significantly improving satisfaction and repeat orders.',
    image: { webp: 'assets/img/portfolio1.webp', jpg: 'assets/img/portfolio1.jpg', alt: 'Kangaroo Propane — Full stack propane delivery web application' }
  },
  {
    number: '05',
    title: 'Wave Marine',
    tagline: 'Multi-vendor marine services marketplace',
    status: 'LIVE',
    flagship: false,
    accent: 'primary',
    tags: ['Marketplace', 'Admin Panel', 'Multi-vendor'],
    metrics: [
      { value: 'Kafka',  label: 'real-time updates',   verify: false },
      { value: '3 roles', label: 'admin/vendor/customer', verify: false }
    ],
    tech: ['Angular', 'Node.js', 'AWS', 'DynamoDB', 'MongoDB', 'Kafka'],
    links: { live: 'https://www.wavemarinegroup.com', github: null },
    problem: 'Marine service industry lacked a unified platform connecting boat owners with service vendors for maintenance, cleaning, and crew services.',
    solution: 'Built a marketplace with real-time booking, vendor management, GPS tracking, payment wallet, and Kafka-powered event streaming for live service updates.',
    impact: 'Streamlined operations for boat wash, cleaning, system checks, and crew services — all orchestrated through a comprehensive admin panel.',
    image: { webp: 'assets/img/wave.webp', jpg: 'assets/img/wave.png', alt: 'Wave Marine — Marine equipment marketplace' }
  },
  {
    number: '06',
    title: 'United Transportation',
    tagline: 'Unified logistics TMS — order → dispatch → billing',
    status: 'IN_DEV',
    flagship: false,
    accent: 'secondary',
    tags: ['Logistics', 'Dashboard', 'TMS'],
    metrics: [
      { value: '4+ mo', label: 'billing backlog cleared', verify: true },
      { value: 'HubSpot+QB', label: 'integrated',          verify: false }
    ],
    tech: ['React', 'AWS Lambda', 'DynamoDB', 'API Gateway', 'QuickBooks', 'HubSpot'],
    links: { live: null, github: null },
    problem: 'Client\'s logistics operations were fragmented across Notion, Ascend TMS, and manual processes — causing double data entry, 4+ months billing backlog, and revenue leakage.',
    solution: 'Designed a unified transport management system with order-to-billing workflow, HubSpot rate card integration, QuickBooks sync, and a mobile-friendly dispatch dashboard.',
    impact: 'Eliminated double data entry, automated billing workflows, and provided real-time visibility from order intake through invoicing.',
    image: null
  },
  {
    number: '07',
    title: 'The Canadian Load Board',
    tagline: 'B2B logistics platform for Canadian brokers & carriers',
    status: 'DELIVERED',
    flagship: false,
    accent: 'accent',
    tags: ['Logistics', 'Platform', 'B2B'],
    metrics: [
      { value: 'Auto', label: 'RFQ workflow',   verify: false },
      { value: 'Stripe', label: 'payments integrated', verify: false }
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    links: { live: null, github: null },
    problem: 'Canadian logistics brokers and carriers lacked a centralized platform for lead generation, load posting, and streamlined RFQ management.',
    solution: 'Built a cloud-based logistics platform with real-time lead generation, inventory management, Stripe-powered payments, and an automated RFQ workflow for brokers and carriers.',
    impact: 'Streamlined the entire broker-carrier relationship — from load discovery through payment — reducing manual coordination and accelerating deal cycles.',
    image: null
  }
];

// Expose for debugging if needed — not used by other scripts
window.__WORK_PROJECTS = PROJECTS;

/* ---------- Card rendering ---------- */

const ACCENT_VAR = {
  primary:      'var(--primary)',
  secondary:    'var(--secondary)',
  accent:       'var(--accent)',
  'accent-warm':'var(--accent-warm)'
};

const STATUS_META = {
  LIVE:      { label: 'LIVE',           className: 'work-status--live' },
  IN_DEV:    { label: 'IN DEVELOPMENT', className: 'work-status--dev' },
  BETA:      { label: 'BETA',           className: 'work-status--beta' },
  DELIVERED: { label: 'DELIVERED',      className: 'work-status--delivered' }
};

function renderTagChips(tags) {
  return tags.map(t => `<span class="tag tag--outline">${escapeHTML(t)}</span>`).join('');
}

function renderTechChips(tech, condensed) {
  const visible = condensed ? tech.slice(0, 5) : tech;
  const extra   = condensed && tech.length > 5 ? tech.length - 5 : 0;
  const chips = visible.map(t => `<span class="work__tech-chip">${escapeHTML(t)}</span>`).join('');
  return extra > 0
    ? chips + `<span class="work__tech-chip work__tech-chip--more">+${extra}</span>`
    : chips;
}

function renderMetrics(metrics, accent) {
  return metrics.map(m => `
    <div class="work__metric">
      <span class="work__metric-dot" style="background:${ACCENT_VAR[accent]}"></span>
      <span class="work__metric-value" data-count-text="${escapeHTML(m.value)}">${escapeHTML(m.value)}</span>
      <span class="work__metric-label">${escapeHTML(m.label)}</span>
    </div>
  `).join('');
}

function renderStatusChip(status) {
  const meta = STATUS_META[status] || STATUS_META.LIVE;
  return `
    <span class="work-status ${meta.className}">
      <span class="work-status__dot"></span>
      ${meta.label}
    </span>
  `;
}

function renderVisual(project) {
  if (project.image) {
    return `
      <div class="work__visual">
        <picture>
          <source type="image/webp" srcset="${escapeHTML(project.image.webp)}" />
          <img src="${escapeHTML(project.image.jpg)}" alt="${escapeHTML(project.image.alt)}" class="work__visual-img" loading="lazy" />
        </picture>
      </div>
    `;
  }
  return `
    <div class="work__visual work__visual--placeholder">
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="${ACCENT_VAR[project.accent]}" stroke-width="1.4" opacity="0.7" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    </div>
  `;
}

function renderCard(project, index) {
  const classes = [
    'work__card',
    project.flagship ? 'work__card--flagship' : '',
    `work__card--${project.accent}`
  ].filter(Boolean).join(' ');

  return `
    <article class="${classes}" data-project-index="${index}" tabindex="0" role="button" aria-label="Open case study for ${escapeHTML(project.title)}">
      <header class="work__card-header">
        <div class="work__card-id">
          <span class="work__card-number" style="color:${ACCENT_VAR[project.accent]}">${project.number}</span>
          <h3 class="work__card-title">${escapeHTML(project.title)}</h3>
        </div>
        ${renderStatusChip(project.status)}
      </header>

      ${renderVisual(project)}

      <p class="work__card-tagline">${escapeHTML(project.tagline)}</p>

      <div class="work__metrics">
        ${renderMetrics(project.metrics, project.accent)}
      </div>

      <div class="work__tech">
        ${renderTechChips(project.tech, !project.flagship)}
      </div>

      <footer class="work__card-footer">
        <span class="work__card-cta">View case study
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </span>
      </footer>
    </article>
  `;
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

function renderAllCards() {
  const bento = document.querySelector('.work__bento');
  if (!bento) return;
  bento.innerHTML = PROJECTS.map((p, i) => renderCard(p, i)).join('');
}

// Run after DOM is ready (script has `defer`, so DOM is parsed already)
renderAllCards();

/* ---------- Scroll-in + count-up ---------- */

function isNumericMetric(valueStr) {
  // Only count-up purely numeric values like "500", "10", "40%", "150–200" we DON'T count up (range)
  const m = valueStr.match(/^(\d+)(\+|%)?$/);
  return m ? { target: parseInt(m[1], 10), suffix: m[2] || '' } : null;
}

function animateCountUp(el) {
  const raw = el.getAttribute('data-count-text') || el.textContent;
  const parsed = isNumericMetric(raw);
  if (!parsed || typeof window.gsap === 'undefined') {
    el.textContent = raw;
    return;
  }
  const obj = { val: 0 };
  window.gsap.to(obj, {
    val: parsed.target,
    duration: 1.1,
    ease: 'power2.out',
    onUpdate() {
      el.textContent = Math.round(obj.val) + parsed.suffix;
    },
    onComplete() {
      el.textContent = raw;
    }
  });
}

function initWorkAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const cards  = document.querySelectorAll('.work__card');

  if (prefersReducedMotion || !hasGSAP) {
    cards.forEach(c => { c.style.opacity = '1'; c.style.transform = 'none'; });
    return;
  }

  window.gsap.set(cards, { opacity: 0, y: 20 });

  window.gsap.to(cards, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.08,
    scrollTrigger: {
      trigger: '.work__bento',
      start: 'top 82%',
      once: true
    }
  });

  cards.forEach(card => {
    window.ScrollTrigger.create({
      trigger: card,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        card.querySelectorAll('.work__metric-value').forEach(animateCountUp);
      }
    });
  });
}

initWorkAnimations();

/* ---------- Modal controller ---------- */

const WorkModal = (function () {
  const modal = document.getElementById('workModal');
  if (!modal) return { open() {}, close() {} };

  const panel       = modal.querySelector('.work-modal__panel');
  const titleEl     = modal.querySelector('#workModalTitle');
  const numberEl    = modal.querySelector('#workModalNumber');
  const metaEl      = modal.querySelector('#workModalMeta');
  const visualEl    = modal.querySelector('#workModalVisual');
  const metricsEl   = modal.querySelector('#workModalMetrics');
  const problemEl   = modal.querySelector('#workModalProblem');
  const solutionEl  = modal.querySelector('#workModalSolution');
  const impactEl    = modal.querySelector('#workModalImpact');
  const techEl      = modal.querySelector('#workModalTech');
  const counterEl   = modal.querySelector('#workModalCounter');
  const prevBtn     = modal.querySelector('#workModalPrev');
  const nextBtn     = modal.querySelector('#workModalNext');
  const closeBtns   = modal.querySelectorAll('[data-work-modal-close]');

  let currentIndex = -1;
  let triggerEl = null;

  function renderContent(index) {
    const p = PROJECTS[index];
    if (!p) return;

    const body = modal.querySelector('.work-modal__body');
    const headerId = modal.querySelector('.work-modal__header-id');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const paint = () => {
      numberEl.textContent = p.number;
      titleEl.textContent = p.title;

      const statusChip = renderStatusChip(p.status);
      const links = [];
      if (p.links && p.links.live)   links.push(`<a href="${escapeHTML(p.links.live)}"   target="_blank" rel="noopener noreferrer">View Live ↗</a>`);
      if (p.links && p.links.github) links.push(`<a href="${escapeHTML(p.links.github)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>`);
      metaEl.innerHTML = statusChip + links.join('');

      if (p.image) {
        visualEl.innerHTML = `
          <picture>
            <source type="image/webp" srcset="${escapeHTML(p.image.webp)}" />
            <img src="${escapeHTML(p.image.jpg)}" alt="${escapeHTML(p.image.alt)}" loading="lazy" />
          </picture>
        `;
      } else {
        visualEl.innerHTML = `
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="${ACCENT_VAR[p.accent]}" stroke-width="1.2" opacity="0.7" aria-hidden="true">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
          </svg>
        `;
      }

      metricsEl.innerHTML = p.metrics.map(m => `
        <div class="work-modal__metric">
          <span class="work-modal__metric-value">${escapeHTML(m.value)}</span>
          <span class="work-modal__metric-label">${escapeHTML(m.label)}</span>
        </div>
      `).join('');

      problemEl.textContent  = p.problem;
      solutionEl.textContent = p.solution;
      impactEl.textContent   = p.impact;

      techEl.innerHTML = p.tech.map(t => `<span class="tag tag--outline">${escapeHTML(t)}</span>`).join('');

      counterEl.textContent = `${index + 1} / ${PROJECTS.length}`;

      body.scrollTop = 0;

      currentIndex = index;
    };

    if (currentIndex === -1 || prefersReducedMotion || typeof window.gsap === 'undefined') {
      paint();
      return;
    }

    const tl = window.gsap.timeline();
    tl.to([body, headerId, metaEl], { opacity: 0, duration: 0.15, ease: 'power1.in', onComplete: paint })
      .to([body, headerId, metaEl], { opacity: 1, duration: 0.2, ease: 'power1.out' });
  }

  function getFocusable() {
    return Array.from(modal.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea'
    )).filter(el => !el.hasAttribute('hidden') && el.offsetParent !== null);
  }

  function handleKeydown(e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); return; }
    if (e.key !== 'Tab') return;

    const focusable = getFocusable();
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function open(index, originEl) {
    triggerEl = originEl || null;
    renderContent(index);
    modal.hidden = false;
    document.body.classList.add('work-modal-open');
    document.addEventListener('keydown', handleKeydown);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (typeof window.gsap !== 'undefined' && !prefersReducedMotion) {
      window.gsap.fromTo(modal.querySelector('.work-modal__backdrop'),
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: 'power1.out' }
      );
      window.gsap.fromTo(panel,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }
      );
    }

    setTimeout(() => {
      const closeBtn = modal.querySelector('.work-modal__close');
      if (closeBtn) closeBtn.focus();
    }, 0);
  }

  function close() {
    modal.hidden = true;
    document.body.classList.remove('work-modal-open');
    document.removeEventListener('keydown', handleKeydown);
    if (triggerEl && typeof triggerEl.focus === 'function') {
      triggerEl.focus();
    }
  }

  function prev() {
    const newIdx = (currentIndex - 1 + PROJECTS.length) % PROJECTS.length;
    renderContent(newIdx);
  }

  function next() {
    const newIdx = (currentIndex + 1) % PROJECTS.length;
    renderContent(newIdx);
  }

  closeBtns.forEach(btn => btn.addEventListener('click', close));
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  return { open, close };
})();

/* ---------- Card click handlers ---------- */
function initCardClickHandlers() {
  document.querySelectorAll('.work__card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      const idx = parseInt(card.getAttribute('data-project-index'), 10);
      if (!isNaN(idx)) WorkModal.open(idx, card);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const idx = parseInt(card.getAttribute('data-project-index'), 10);
        if (!isNaN(idx)) WorkModal.open(idx, card);
      }
    });
  });
}

initCardClickHandlers();
