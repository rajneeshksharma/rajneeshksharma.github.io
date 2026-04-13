# Portfolio Redesign — Design Spec

## Overview

Transform the existing HTML-based portfolio from a generic template into a bold, experimental, award-worthy freelance developer portfolio. The redesign keeps the single-file HTML structure, stays deployable on GitHub Pages, and upgrades every visual and structural element to 2025+ standards.

**Target audience:** Freelance clients (technical CTOs to non-technical founders)
**Design direction:** Neon Gradient — dark base, multi-color gradient mesh, emerald/blue/purple accents
**Key differentiator:** AI-Powered Development section showcasing Claude Code, MCP workflows, RAG, and AI-augmented architecture

---

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--base` | `#0c0c0c` | Page background |
| `--surface` | `#111827` | Card backgrounds, sections |
| `--surface-2` | `#1e293b` | Borders, dividers |
| `--text-primary` | `#f1f5f9` | Headings |
| `--text-secondary` | `#94a3b8` | Body text |
| `--text-muted` | `#475569` | Labels, captions |
| `--primary` | `#10b981` | Emerald — CTAs, primary actions, "available" indicator |
| `--secondary` | `#3b82f6` | Blue — secondary accents, links |
| `--accent` | `#a855f7` | Purple — AI section, highlights |
| `--accent-warm` | `#f97316` | Orange — sparingly for emphasis |
| `--gradient-mesh` | Radial gradients of primary/secondary/accent at low opacity | Background atmosphere |

### Dark Theme (Default)

The entire portfolio is dark-first. The existing dark/light toggle will be kept but inverted — dark is now default. Light mode will use:
- `--base`: `#fafafa`
- `--surface`: `#ffffff`
- `--surface-2`: `#e2e8f0`
- `--text-primary`: `#0f172a`
- `--text-secondary`: `#475569`
- Accent colors stay the same (they work on both backgrounds)

### Typography

| Role | Font | Weight | Size (desktop) |
|------|------|--------|----------------|
| Headings (h1-h3) | Space Grotesk | 700 | 3rem / 2.25rem / 1.5rem |
| Body | Space Grotesk | 400 | 1rem |
| Code, labels, monospace | Fira Code | 400-500 | 0.875rem |
| Section labels | Fira Code | 400 | 0.75rem, letter-spacing: 2-3px |

Both fonts loaded from Google Fonts CDN. Space Grotesk replaces Poppins entirely. Fira Code is used for all monospace elements including section labels (e.g., "FEATURED WORK"), tech tags, and the terminal demo.

### Spacing

- Max container width: `1200px` (up from 768px)
- Section padding: `6rem 0` on desktop, `3rem 0` on mobile
- Card border-radius: `12px`
- Consistent gap: `1.5rem` for grids, `0.75rem` for inline elements

### Components

**Buttons:**
- Primary: `background: --primary`, white text, `border-radius: 24px`, padding `12px 28px`
- Ghost: transparent background, `border: 1px solid --primary`, primary-colored text
- Hover: slight scale (1.02) + brightness increase

**Cards:**
- Background: `--surface` with `border: 1px solid --surface-2`
- Gradient accent line at top (2px, left-to-right gradient)
- Hover: border color lightens, subtle translateY(-2px)

**Tags/Pills:**
- Small rounded pills with colored backgrounds at 15% opacity
- Text color matches the full-opacity accent
- Used for tech stack, project categories, AI tools

---

## Section Specifications

### Section 1: Hero

**Purpose:** Immediate credibility + CTA for freelance clients

**Layout:**
- Full viewport height (100vh)
- Gradient mesh background (3 radial gradients at low opacity positioned at different corners)
- Subtle grid pattern overlay (optional, via CSS)

**Content:**
- Top-left: "Available for projects" with animated green dot (CSS pulse)
- Main heading: "Turning complex problems into elegant solutions" — staggered word reveal animation
- Subtitle: "Senior Full Stack Developer / AI-Augmented Workflows / 8+ Years"
- CTA button: "Let's Talk" (links to #contact)
- Stats bar at bottom: `20+ Projects` | `8+ Years` | `AI Powered` — separated by subtle borders

**Navigation:**
- Fixed top nav (not bottom as currently on mobile)
- Left: "R.S" logo mark
- Right: Work | Stack | AI | Services | About | Contact
- Far right: "Let's Talk" pill button + dark/light toggle
- On mobile: hamburger menu (top-right), slides in from right

**Removes:** Blob SVG avatar, "Hi I'am Rajneesh" greeting, "Scroll Down" indicator, social icons sidebar

### Section 2: Featured Work

**Purpose:** Show, don't tell — prove capability through real projects

**Layout:** Full-width case study cards, stacked vertically with `3rem` gap between

**Per project card:**
- Gradient accent line at top (2px)
- Left column (55%): Project label (monospace, colored) → Project title (h3) → Category tags (pills) → Problem/Solution/Impact text → Tech stack tags (bordered pills)
- Right column (45%): Screenshot in a device-frame mockup (rounded corners, subtle border, dark background)
- On mobile: single column, screenshot above text

**Project data structure:**
```
- Label: "FEATURED PROJECT" / "CLIENT PROJECT" / numbered (01, 02, 03)
- Title: Project name
- Tags: Category pills (E-commerce, Real-time, Marketplace, etc.)
- Problem: 1 sentence
- Solution: 1 sentence  
- Impact: 1 sentence
- Tech: Array of technology names
- Image: Screenshot path or placeholder
- Link: Demo URL (optional — some projects are client-confidential)
```

**Current projects to include:**
1. Kangaroo Propane — E-commerce + real-time tracking
2. Wave Marine — Marketplace platform
3. Additional projects the user will provide (placeholders with clean "Client Confidential" treatment)

**Animation:** Cards slide in from bottom on scroll (GSAP ScrollTrigger, staggered 0.2s)

### Section 3: Tech Stack

**Purpose:** Replace outdated skill progress bars with a modern, visual grid

**Layout:** 4-category grid

**Categories:**
1. **Frontend** — JavaScript, TypeScript, React, Angular 2+, HTML5, CSS3
2. **Backend** — Node.js, Express.js
3. **Database** — MongoDB, Amazon DynamoDB
4. **Cloud & AI** — AWS, Claude Code, AI/ML workflows

**Per technology:**
- Icon (from Devicon CDN — provides tech logos as font icons)
- Name label below icon
- Category header above each group (monospace, colored)

**Layout:** Each category is a card with the category name, containing a flex-wrap grid of icon+name pairs. 2 columns on mobile, 4 columns on desktop.

**Animation:** Icons float slightly with mouse movement (parallax effect via JS mousemove listener). Staggered fade-in on scroll.

**Removes:** Percentage bars, "90%/80%/70%" numbers, accordion open/close toggle

### Section 4: AI-Powered Development

**Purpose:** Key differentiator — show depth of AI integration in workflows AND ability to build AI solutions

**Layout:** Two-column on desktop, stacked on mobile

**Left column — Terminal Demo:**
- Fake terminal window with macOS-style dots (red/yellow/green)
- Title bar: "claude-code — portfolio"
- Content: Pre-written command sequences that auto-type on scroll:
  ```
  $ claude "analyze auth module for security issues"
    ▸ Reading 12 files...
    ▸ Found 3 vulnerabilities (2 critical)
    ▸ Auto-fixing with tests...
  $ claude "design API for payment service"
    ▸ Architecture plan generated
    ▸ 14 endpoints, 6 models, full test suite
  ✓ All tests passing
  ```
- The typing animation triggers when the section scrolls into view (GSAP ScrollTrigger)

**Right column — Impact Stats:**
- 3 stat cards stacked vertically:
  - `3x` — Faster prototyping
  - `80%` — Test coverage standard
  - `AI` — Augmented code review

**Below both columns — AI Capabilities:**
- "What I Build With AI" subsection with 4 compact cards:
  1. **RAG Systems** — Retrieval-augmented generation for intelligent search and knowledge bases
  2. **AI-Integrated Apps** — Embedding AI capabilities into production web applications
  3. **MCP Workflows** — Custom Model Context Protocol servers for development automation
  4. **Intelligent Automation** — AI-powered testing, code review, and architecture design

**Tool pills row:** Claude Code | MCP Servers | RAG | TDD Automation | Security Review | Architecture

**Section header:**
- Monospace label: "AI-POWERED DEVELOPMENT"
- Heading: "I build with AI, not just about AI"
- Subtitle: "AI is my multiplier — every project ships faster, with higher quality, and fewer bugs."

**Animation:** Terminal auto-type on scroll, stat numbers count up, capability cards stagger in

### Section 5: Services

**Purpose:** Client-focused — what you can build FOR THEM

**Reframe:** "What i offer" → "What I Can Build For You"

**Layout:** 3-4 cards in a grid (3 columns desktop, 1 column mobile)

**Cards:**
1. **Full-Stack Web Applications** — "End-to-end development from UI to database. React, Angular, Node.js — whatever the project needs."
2. **API & Backend Systems** — "Scalable APIs, microservices, and cloud architecture on AWS. Built for growth."
3. **AI-Integrated Solutions** — "RAG systems, AI workflows, and intelligent features embedded into your product."
4. **Performance & Architecture** — "Code audits, performance optimization, and architecture consulting for existing apps."

**Per card:**
- Icon (from Devicon or simple CSS icon)
- Title
- Description (2 sentences max, outcome-focused)
- No "View more" modal — the description is enough

**Animation:** Staggered fade-up on scroll

**Removes:** "View more" modals, generic service descriptions, "Learning and earning new ideas"

### Section 6: About

**Purpose:** Personal connection — moved down because work comes first for freelance

**Layout:** Two-column (photo left, text right)

**Left:** Clean photo using `assets/img/my.png` as primary (fallback: `assets/img/k.jpg`). No external URL dependencies. Photo styled with `border-radius: 12px` and subtle border matching `--surface-2`.

**Right:**
- Short personal story (3-4 sentences max)
- Key stats inline: 8+ years, 20+ projects, 6+ companies
- Social links: GitHub, LinkedIn (user should add), Twitter/X (if they have one)

**Content rewrite suggestion:**
"Senior Full Stack Developer based in Chandigarh, India. 8+ years building web applications for clients across the globe — from e-commerce platforms to marine marketplaces. I ship fast, write clean code, and use AI to deliver at a level that used to take entire teams."

**Animation:** Photo fades in from left, text fades in from right

### Section 7: GitHub Activity

**Purpose:** Social proof — active contribution calendar

**Layout:** Full-width card with the GitHub contribution calendar widget

**Styling overrides:**
- Calendar squares: Use `--primary` (emerald) for contribution colors instead of default green
- Background: `--surface`
- Text: `--text-secondary`
- Border: `1px solid --surface-2`

**Fix:** Remove the broken proxy code. Use the standard GitHubCalendar call with responsive option only.

### Section 8: Contact / CTA

**Purpose:** Convert interest into action

**Layout:**
- Big heading: "Let's build something great together"
- Subtitle: "Have a project in mind? I'm currently available for freelance work."
- Two-column below: Contact info (left) + Form (right)

**Contact info:**
- Email (clickable mailto)
- Location: Chandigarh, India
- Phone (clickable tel)
- Social icons row: GitHub + any others

**Form:** Same fields (Name, Email, Project, Message) with same mailto approach, but styled with the new design system. Proper labels, focus states, validation styling.

**Footer:**
- Minimal: "Rajneesh Sharma" | Quick nav links | Social icons
- Copyright: "Built with AI-augmented workflows"

**Removes:** "Project in mind" CTA section (merged into contact), duplicate contact section IDs

**Animation:** Heading reveals on scroll, form fields slide up staggered

---

## Motion System

**Library:** GSAP 3 + ScrollTrigger plugin (both via CDN, ~45KB gzipped total)

### Animations

| Element | Animation | Trigger |
|---------|-----------|---------|
| Hero heading | Staggered word reveal (opacity 0→1, y 20→0) | Page load |
| Hero stats | Fade up, 0.3s delay after heading | Page load |
| "Available" dot | CSS pulse animation (infinite) | Always |
| Project cards | Slide up from bottom (y 60→0, opacity 0→1) | ScrollTrigger, stagger 0.2s |
| Tech icons | Float on mouse move (subtle parallax via JS) | Mousemove listener |
| Tech icons | Staggered fade-in | ScrollTrigger |
| Terminal text | Typewriter effect (characters appear sequentially) | ScrollTrigger (once) |
| Stat numbers | Count up from 0 | ScrollTrigger (once) |
| AI capability cards | Staggered fade-up | ScrollTrigger |
| Service cards | Staggered fade-up | ScrollTrigger |
| About photo | Fade in from left (x -30→0) | ScrollTrigger |
| About text | Fade in from right (x 30→0) | ScrollTrigger |
| Contact heading | Reveal on scroll | ScrollTrigger |
| Contact form | Fields slide up staggered | ScrollTrigger |
| Nav | Background opacity change on scroll | Scroll listener |

### Performance Rules
- All ScrollTrigger animations use `once: true` (play once, don't replay on scroll back)
- Use `will-change: transform` on animated elements
- Batch similar animations
- `prefers-reduced-motion` media query: disable all animations, show static state

---

## Technical Changes

### Added (CDN)
- GSAP 3 + ScrollTrigger: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js` + ScrollTrigger plugin
- Space Grotesk: Google Fonts
- Fira Code: Google Fonts
- Devicon: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css`

### Removed
- Swiper.js (swiper-bundle.min.js + swiper-bundle.min.css) — no more carousel
- Poppins font — replaced by Space Grotesk
- Unicons CDN — navigation switches to text-only links (no icons needed in the new minimal nav design); tech icons handled by Devicon

### Modified
- `index.html` — Complete restructure of sections and content
- `assets/css/styles.css` — Complete rewrite of design system (colors, typography, layout, components)
- `assets/js/main.js` — Rewrite: remove Swiper/qualification/testimonial code, add GSAP animations, fix experience date, fix GitHub calendar

### Bug Fixes
- Experience start date: `06/16/2014` → `06/16/2018`
- Typo: "I'am" → "I'm"
- Typo: "WEll EXPERIENCED" → proper casing
- About image: External URL → local asset
- GitHub calendar: Remove broken proxy, use standard call
- Container max-width: 768px → 1200px
- Duplicate `id="contact"` on two sections → unique IDs
- Nav position: Bottom on mobile → Top on all devices
- Add favicon (inline SVG data URI in `<link rel="icon">` — generates "RS" text on dark circle, no extra file needed)
- Improve meta tags for SEO (description, og:image, og:description)

---

## Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|---------------|
| < 480px (small mobile) | Single column everything, reduced font sizes, hamburger nav |
| 480-768px (large mobile/tablet) | Project cards single column, tech grid 2 columns |
| 768-1024px (tablet/small desktop) | Two-column layouts activate, nav links visible |
| > 1024px (desktop) | Full layout, max-width 1200px container, all columns active |

---

## Files Changed

| File | Action | Description |
|------|--------|-------------|
| `index.html` | Heavy edit | Restructure all 8 sections, new content, new CDN links |
| `assets/css/styles.css` | Rewrite | New design system, all new styles |
| `assets/js/main.js` | Rewrite | GSAP animations, fixed logic, remove dead code |
| `assets/css/swiper-bundle.min.css` | Delete | No longer needed |
| `assets/js/swiper-bundle.min.js` | Delete | No longer needed |
| `.gitignore` | Already created | Ignores .superpowers/ and tasks/ |

---

## Out of Scope

- No framework migration (stays vanilla HTML/CSS/JS)
- No build tools or bundlers
- No backend/serverless functions
- No CMS integration
- No blog section (can be added later)
- No testimonials section (can be added when client quotes are available)
- No custom domain setup (stays on github.io)
