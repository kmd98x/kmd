# KMD portfolio — progress & context

Living notes for scroll animations, layout, and related decisions. Update this file when behavior changes.

## Stack & constraints

- **Next.js** App Router (`app/`)
- **GSAP 3** + **ScrollTrigger** for scroll-driven animation (no Framer Motion — see `.cursor/rules/no-framer-motion.mdc`)
- **Tailwind CSS** for layout and typography

## Page structure

| Order | Section / component | File | Notes |
|-------|---------------------|------|--------|
| Global | Navigation (hamburger + overlay) | `app/sections/Navigation.jsx` | Rendered in `app/layout.js` |
| 1 | Header (hero) | `app/sections/Header.jsx` | `id="home"`, full viewport height |
| 2 | About | `app/sections/About.jsx` | `id="about"` |
| 3 | Projects | `app/components/projects/ProjectsCarousel.jsx` | `id="projects"` (verify in component) |
| 4 | Footer | `app/sections/Footer.jsx` | `id="footer"` |

Home page: `app/page.js` — stacks Header → About → ProjectsCarousel → Footer with a responsive gap.

## Header hero

### DOM / IDs

- `#home` — `<header>` wrapper
- `heroShellRef` — outer positioning wrapper (GSAP sets `fixed` / `absolute`)
- `#hero-content` — inner block animated for fade/zoom (PORTFOLIO letters, sitting SVG, `MartinaDoekharan` SVG)

### `createHeaderHeroScroll` — `app/animations/headerHeroScroll.js`

- Wired in `Header.jsx` via `useLayoutEffect`
- **`SCROLL_RELEASE_PX = 648`** (passed as `releasePx`)
- Below release: hero shell is **`fixed`**, centered (`top/left 50%`, `xPercent/yPercent -50`)
- At/above release scroll: switches to **`absolute`** at `top: calc(648px + 50vh)` so it scrolls away with the document without a visual jump

### Hero fade/zoom (scrubbed) — `createAboutEntranceAnimation`

- Target: `#hero-content` (not the shell)
- Trigger: `#home`
- **`start: "top top"`** → **`end: "bottom top"`** (full header scroll range)
- **`scrub: 1`**
- Timeline:
  1. **~92%** of range: `opacity: 1`, `scale` 1 → 1.08
  2. **Last ~8%** (`HERO_FADE_PORTION = 0.08`): `opacity` → 0, `scale` stays 1.08
- Tune faster/slower fade by changing **`HERO_FADE_PORTION`** in `app/animations/aboutEntranceAnimation.js` (smaller = snappier fade)

## About section

### Setup — `app/sections/About.jsx`

- `useLayoutEffect` calls **`createAboutEntranceAnimation`** with:
  - `heroContent` → `#hero-content`
  - `aboutSection` → section ref (`#about`)
  - `title` → “Over mij” heading
  - `text` → paragraph ref

### `createAboutEntranceAnimation` — `app/animations/aboutEntranceAnimation.js`

**No section slide** — about block does not translate on Y anymore (removed `ABOUT_SLIDE_OFFSET` behavior).

**About scrub** (ScrollTrigger on `#about`):

- **`start: "top bottom"`** → **`end: "top 35%"`**, **`scrub: 1`**
- Title: split into chars via `app/utils/split.js`, initial `opacity: 0`, stagger reveal
- Body: chars wrapped at `opacity: 0.1` → `1`, stagger reveal (starts ~20% into about timeline)

**Not used on About anymore:** separate `titleAnimation` / `aboutTextAnimation` calls (orchestrated in entrance animation).

### Other animation files

| File | Role |
|------|------|
| `aboutEntranceAnimation.js` | **Main** header + about scroll choreography |
| `headerHeroScroll.js` | Hero shell fixed → absolute |
| `headerToAboutAnimation.js` | Re-exports `createAboutEntranceAnimation` (legacy name) |
| `aboutTextAnimation.js` | Standalone scrubbed text helper (if needed elsewhere) |
| `titleAnimation.js` | Used by **Projects** section, not About |
| `aboutImageAnimation.js` | Commented out in About (image block removed) |
| `projectsAnimation.js` | Projects carousel / section |

## Navigation

- **`app/sections/Navigation.jsx`**: menu state, hamburger button, `scrollToSection`
- **`app/components/HamburgerMenu.jsx`**: overlay nav; `onNavigate(e, sectionId)` → `#home`, `#about`, `#projects`, `#footer`

## History (conversation arc)

1. Header centered with `fixed` + translate; release at scroll threshold to scroll with page
2. Navigation moved out of Header into `Navigation.jsx` (layout-wide)
3. Header → About: play/reverse timelines, then split hero timeline for faster hero reverse on scroll up
4. About slide-up + parallel hero fade; then unified entrance animation
5. Switched to **scrub** for hero; then scrub for about text/title
6. Removed about **slide**; hero **opacity** holds until end of header scrub, then quick fade (`HERO_FADE_PORTION`)
7. Faster header fade: `HERO_FADE_PORTION` **0.18 → 0.08**
8. Responsive header experiment **reverted** (back to desktop-oriented sizing)

## Tuning cheatsheet

| Goal | Where |
|------|--------|
| Faster/slower hero fade at end of header | `HERO_FADE_PORTION` in `aboutEntranceAnimation.js` |
| When hero unfixes from viewport | `SCROLL_RELEASE_PX` in `Header.jsx` / `headerHeroScroll.js` |
| About text reveal scroll distance | `end: "top 35%"` on about scrub trigger |
| Hero scrub scroll distance | `end: "bottom top"` on `#home` trigger |

## Known follow-ups (optional)

- Header layout is not fully responsive (responsive pass was reverted)
- `heroShellRef` has Tailwind `fixed` classes while GSAP also sets `position` — intentional fallback before GSAP runs
- ESLint config may need fixing for `npm run lint` (unrelated to animations)
