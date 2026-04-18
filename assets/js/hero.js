/* ==================== HERO REDESIGN — LOAD + LOOPS ==================== */
(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const words = hero.querySelectorAll('.hero__word');
  const pill = hero.querySelector('.hero__pill');
  const tagline = hero.querySelector('.hero__tagline');
  const credentials = hero.querySelector('.hero__credentials');
  const actions = hero.querySelector('.hero__actions');
  const stats = hero.querySelector('.hero__stats');
  const terminal = hero.querySelector('.hero__terminal');
  const badges = hero.querySelectorAll('.hero__badge');

  // ---------- On-load timeline ----------
  if (hasGSAP && !prefersReducedMotion) {
    const tl = window.gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(pill,        { opacity: 0, y: -12, duration: 0.5 }, 0.2)
      .from(words,       { opacity: 0, y: 24, duration: 0.6, stagger: 0.05 }, 0.3)
      .from(tagline,     { opacity: 0, y: 12, duration: 0.5 }, 0.9)
      .from(credentials, { opacity: 0, y: 10, duration: 0.4 }, 1.0)
      .from(actions,     { opacity: 0, y: 12, duration: 0.5 }, 1.05)
      .from(stats,       { opacity: 0, y: 12, duration: 0.5 }, 1.15)
      .from(terminal,    { opacity: 0, scale: 0.9, duration: 0.7, ease: 'back.out(1.4)' }, 0.8)
      .from(badges,      { opacity: 0, duration: 0.5, stagger: 0.05 }, 1.1);
  } else {
    [pill, tagline, credentials, actions, stats, terminal, ...words, ...badges].forEach(el => {
      if (el) el.style.opacity = '1';
    });
  }

  // ---------- Count-up stats ----------
  const statNumbers = hero.querySelectorAll('.hero__stat-number[data-count]');
  if (hasGSAP && !prefersReducedMotion) {
    statNumbers.forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      const obj = { val: 0 };
      window.gsap.to(obj, {
        val: target,
        duration: 1.4,
        delay: 1.3,
        ease: 'power2.out',
        onUpdate() { el.textContent = Math.round(obj.val); }
      });
    });
  } else {
    statNumbers.forEach(el => { el.textContent = el.dataset.count; });
  }

  // ---------- Rotating verb ----------
  const verbEl = document.getElementById('heroVerb');
  if (verbEl) {
    const verbs = ['build', 'ship', 'scale', 'debug', 'refactor'];
    let idx = 0;
    let charIdx = verbs[0].length;
    let deleting = false;

    function tick() {
      const current = verbs[idx];
      if (deleting) {
        charIdx--;
        verbEl.textContent = current.slice(0, charIdx);
        if (charIdx === 0) {
          deleting = false;
          idx = (idx + 1) % verbs.length;
          setTimeout(tick, 220);
          return;
        }
        setTimeout(tick, 50);
      } else {
        charIdx++;
        verbEl.textContent = current.slice(0, charIdx);
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
        setTimeout(tick, 80);
      }
    }

    if (!prefersReducedMotion) {
      setTimeout(tick, 1800);
    } else {
      verbEl.textContent = 'build';
    }
  }

  // ---------- Terminal typing loop ----------
  const termCode = document.getElementById('heroTerminalCode');
  const termCursor = document.getElementById('heroTerminalCursor');

  if (termCode) {
    const lines = [
      { text: '$ idea → production',              cls: 'prompt' },
      { text: '▸ Scoping requirements...   done', cls: 'arrow' },
      { text: '▸ Architecting system...     done', cls: 'arrow' },
      { text: '▸ Shipping with Claude...    done', cls: 'arrow' },
      { text: '✓ Deployed in 14 days',             cls: 'check' },
      { text: '$ _',                                cls: 'prompt' },
    ];

    const CHAR_MS = 22;
    const LINE_PAUSE_MS = 260;
    const CYCLE_HOLD_MS = 3200;

    function typeLine(text, className) {
      return new Promise(resolve => {
        const span = document.createElement('span');
        span.className = className || '';
        termCode.appendChild(span);
        let i = 0;
        function step() {
          span.textContent = text.slice(0, ++i);
          if (i < text.length) {
            setTimeout(step, CHAR_MS);
          } else {
            termCode.appendChild(document.createTextNode('\n'));
            setTimeout(resolve, LINE_PAUSE_MS);
          }
        }
        step();
      });
    }

    async function runCycle() {
      termCode.textContent = '';
      for (const line of lines) {
        await typeLine(line.text, line.cls);
      }
      await new Promise(r => setTimeout(r, CYCLE_HOLD_MS));
      runCycle();
    }

    function renderStatic() {
      termCode.textContent = lines.map(l => l.text).join('\n');
    }

    if (prefersReducedMotion) {
      renderStatic();
    } else {
      setTimeout(runCycle, 1400);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden && termCursor) termCursor.style.animationPlayState = 'paused';
        else if (termCursor) termCursor.style.animationPlayState = 'running';
      });
    }
  }

  // ---------- Canvas parallax dots ----------
  const canvas = document.getElementById('heroParallax');
  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext('2d');
    let width = 0, height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots = [];
    let rafId = null;
    let running = true;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(80, Math.max(30, Math.round(width * height / 18000)));
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.3,
        vx: (Math.random() - 0.3) * 0.18,
        vy: (Math.random() - 0.3) * 0.12,
        a: Math.random() * 0.35 + 0.15
      }));
    }

    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < -4) d.x = width + 4;
        if (d.x > width + 4) d.x = -4;
        if (d.y < -4) d.y = height + 4;
        if (d.y > height + 4) d.y = -4;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148, 163, 184, ${d.a})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (rafId) return;
      running = true;
      frame();
    }

    function stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
    }

    resize();
    start();

    window.addEventListener('resize', () => {
      stop();
      resize();
      start();
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stop();
      else start();
    });
  }
})();
