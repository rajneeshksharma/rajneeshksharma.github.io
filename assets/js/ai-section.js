/* ==================== AI SECTION — ANIMATIONS + SYNC ==================== */
(function () {
  const section = document.getElementById('ai');
  if (!section) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  const beforePanel = section.querySelector('.ai-panel--before');
  const withPanel   = section.querySelector('.ai-panel--with');
  const beforeSteps = beforePanel ? beforePanel.querySelectorAll('.ai-panel__step') : [];
  const withSteps   = withPanel ? withPanel.querySelectorAll('.ai-panel__step') : [];
  const termCode    = document.getElementById('aiTerminalCode');
  const termCursor  = document.getElementById('aiTerminalCursor');

  // Terminal block definitions (index maps to With-AI step index)
  const TERMINAL_BLOCKS = [
    {
      // Step 0: Describe intent to Claude
      lines: [
        { text: '$ claude plan "add auth system with JWT + refresh tokens"', cls: 'prompt' },
        { text: '▸ Planning...                                 done',        cls: 'arrow' },
        { text: '▸ Wrote ./docs/plans/2026-04-20-auth.md       done',        cls: 'arrow' }
      ]
    },
    {
      // Step 1: Review + refine plan
      lines: [
        { text: '$ claude review --plan',                                   cls: 'prompt' },
        { text: '▸ Identified 2 edge cases · 1 security note  done',        cls: 'arrow' },
        { text: '✓ Plan approved',                                           cls: 'check' }
      ]
    },
    {
      // Step 2: Implement with TDD loop
      lines: [
        { text: '$ claude implement --tdd',                                  cls: 'prompt' },
        { text: '▸ Writing test: login happy path              done',        cls: 'arrow' },
        { text: '▸ Writing impl: JWT issuance                  done',        cls: 'arrow' },
        { text: '▸ 24 tests passing · 0 failing                done',        cls: 'arrow' }
      ]
    },
    {
      // Step 3: Security + review audit
      lines: [
        { text: '$ claude audit --security',                                cls: 'prompt' },
        { text: '✓ No secrets leaked · rate-limit in place',                cls: 'check' },
        { text: '✓ PR #142 opened — ready for review',                      cls: 'check' }
      ]
    },
    {
      // Idle tail
      lines: [
        { text: '$ _', cls: 'prompt' }
      ]
    }
  ];

  // Reduced-motion / no-GSAP fallback: snap panels visible, render terminal statically
  if (!hasGSAP || prefersReducedMotion) {
    [...beforeSteps, ...withSteps].forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
    if (termCode) {
      const allText = TERMINAL_BLOCKS.map(b => b.lines.map(l => l.text).join('\n')).join('\n\n');
      termCode.textContent = allText;
    }
    if (termCursor && prefersReducedMotion) termCursor.style.animation = 'none';
    window.__AI_SECTION_CTX = { section, fallback: true };
    return;
  }

  /* ---------- Terminal typing + panel sync ---------- */
  const CHAR_MS         = 22;
  const LINE_PAUSE_MS   = 240;
  const BLOCK_PAUSE_MS  = 520;
  const CYCLE_HOLD_MS   = 2000;

  function setActiveWithStep(i) {
    withSteps.forEach(el => el.classList.remove('is-active'));
    if (i < 0 || i >= withSteps.length) return;
    withSteps[i].classList.add('is-active');
  }

  function typeLine(text, cls) {
    return new Promise(resolve => {
      const span = document.createElement('span');
      span.className = cls || '';
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

  async function typeBlock(block, withStepIndex) {
    setActiveWithStep(withStepIndex);
    for (const line of block.lines) {
      await typeLine(line.text, line.cls);
    }
    await new Promise(r => setTimeout(r, BLOCK_PAUSE_MS));
  }

  async function startTerminalCycle() {
    if (!termCode) return;
    while (true) {
      termCode.textContent = '';
      for (let i = 0; i < TERMINAL_BLOCKS.length; i++) {
        const block = TERMINAL_BLOCKS[i];
        const withIdx = i < withSteps.length ? i : -1;
        await typeBlock(block, withIdx);
      }
      setActiveWithStep(-1);
      await new Promise(r => setTimeout(r, CYCLE_HOLD_MS));
    }
  }

  // Pause cursor blink when tab hidden
  document.addEventListener('visibilitychange', () => {
    if (!termCursor) return;
    termCursor.style.animationPlayState = document.hidden ? 'paused' : 'running';
  });

  window.__startAITerminalCycle = startTerminalCycle;

  /* ---------- Panel collapse animation + count-up ---------- */
  function initPanelAnimation() {
    window.gsap.set([...beforeSteps, ...withSteps], { opacity: 0, y: 8 });

    window.ScrollTrigger.create({
      trigger: section,
      start: 'top 72%',
      once: true,
      onEnter: () => {
        const tl = window.gsap.timeline({ defaults: { ease: 'power2.out' } });

        // Phase 1: Before steps stagger in
        tl.to(beforeSteps, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.07
        }, 0);

        // Phase 2: pause, then collapse Before column upward + fade
        tl.to(beforeSteps, {
          opacity: 0.25,
          y: -8,
          scale: 0.98,
          duration: 0.5,
          ease: 'power2.in',
          stagger: { each: 0.02, from: 'end' }
        }, 1.2);

        // Phase 3: With-AI steps fade-in staggered
        tl.to(withSteps, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08
        }, 1.4);

        // Phase 4: count up "before" days (14) then restore readable text
        const beforeDaysEl = beforePanel.querySelector('[data-count-to]');
        if (beforeDaysEl) {
          const targetDays = parseInt(beforeDaysEl.dataset.countTo, 10);
          const suffix = beforeDaysEl.dataset.countSuffix || '';
          const obj = { val: 0 };
          tl.to(obj, {
            val: targetDays,
            duration: 0.9,
            ease: 'power2.out',
            onUpdate() {
              beforeDaysEl.textContent = Math.round(obj.val) + suffix;
            },
            onComplete() {
              beforeDaysEl.textContent = '~2 weeks';
            }
          }, 1.4);
        }

        // Phase 5: kick off the terminal after panel settles
        tl.call(() => {
          if (typeof window.__startAITerminalCycle === 'function') window.__startAITerminalCycle();
        }, null, 2.1);
      }
    });
  }

  initPanelAnimation();

  window.__AI_SECTION_CTX = { section, beforePanel, withPanel, beforeSteps, withSteps, termCode, termCursor, TERMINAL_BLOCKS };
})();
