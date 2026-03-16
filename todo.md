# Stella's Portfolio — Improvement Plan

## Overview

A set of UI/UX improvements for the industrial design portfolio site. The site is a static two-page site (index.html + about.html) built with vanilla HTML, CSS, and JS, hosted on GitHub Pages.

---

## 1. Color Scheme Overhaul

**Status:** ⬜ Pending (awaiting color choices)

**Current state:** Light gray bg (#fafafa), deep red accent (#9B111E), muted grays for text.

**What to do:**
- Update all CSS custom properties in `:root` (styles.css) with the new palette
- Ensure new colors meet WCAG AA contrast requirements
- Update hero gradient background to match new scheme
- Adjust modal overlay, button hover states, and accent underlines
- Test across both pages (index.html, about.html)

**Blocked on:** Stella providing preferred color palette

---

## 2. Navbar Redesign

**Status:** ⬜ Pending (awaiting design direction)

**Current state:** Fixed top bar, transparent over hero → solid on scroll. Logo left, links right, hamburger on mobile.

**What to do:**
- Redesign nav styling (spacing, typography, hover effects)
- Improve mobile hamburger menu (animation, overlay style)
- Ensure nav looks correct on both pages (index has transparent hero-overlay nav, about has always-solid nav)
- Consider adding active-page indicator for current page

**Blocked on:** Design direction decision (minimal, sidebar, overlay, etc.)

---

## 3. Project Cards Redesign

**Status:** ⬜ Ready

**Current state:** Simple white cards with border, subtle hover lift, text overlay on hover. Placeholder images on 5 of 6 cards.

**What to do:**
- Redesign card layout for a more stylish look (e.g., larger image area, refined typography, tag placement)
- Improve hover effects (e.g., parallax tilt, gradient overlays, image zoom + blur, animated underlines)
- Add richer visual hierarchy — stronger title weight, better tag styling (pill badges, color-coded by category)
- Refine card grid spacing and responsive behavior
- Consider adding a subtle entry animation (staggered reveal is already there, can enhance)

**Files:** `styles.css` (card styles), `index.html` (card markup), `script.js` (hover overlays, animations)

---

## 4. Modal Improvements & Gallery Navigation

**Status:** ⬜ Ready

**Current state:** Modal opens on card click, shows project details. The Shiro card has 2 images with prev/next buttons in the card, but gallery cycling JS is missing. Modal has prev/next buttons in markup but no wired-up logic.

**What to do:**
- Implement image gallery cycling in the modal (prev/next buttons, dot indicators)
- Add next/previous project navigation within the modal (arrow keys + buttons to jump between projects)
- Polish modal transitions (smoother open/close animation)
- Ensure gallery works with both real images and placeholder divs
- Add swipe support for mobile gallery navigation

**Files:** `script.js` (gallery logic), `styles.css` (gallery/modal styles), `index.html` (modal markup)

---

## 5. Navigation & Page Transitions

**Status:** ⬜ Ready

**Current state:** Fade-out transition when navigating between pages (300ms). Smooth scroll for anchor links. Mobile nav closes on link click.

**What to do:**
- Refine page transition animation (consider slide or cross-fade instead of simple fade)
- Add a shared transition state so the incoming page knows it was navigated to (e.g., via URL param or sessionStorage)
- Improve scroll-to-section smoothness when arriving at about.html#contact from index.html
- Consider adding a loading indicator for slower connections
- Ensure back/forward browser navigation still works cleanly with transitions

**Files:** `script.js` (transition logic), `styles.css` (transition animations)

---

## 6. Resume & About Me Content Update

**Status:** ⬜ Pending (awaiting real content)

**Current state:** Placeholder content — generic job titles, skills, education, bio text, stats (7+ years, 30+ projects, 12 clients).

**What to do:**
- Replace bio paragraphs with Stella's real story
- Update experience section (real job titles, companies, dates, descriptions)
- Update skills list with Stella's actual skills
- Update education details
- Replace stats with real numbers
- Replace placeholder contact links (email, LinkedIn, Behance) with real URLs
- Add Stella's real photo to the about section

**Blocked on:** Stella providing her real resume/bio content

---

## Task Dependencies

```
Color Scheme ──┐
               ├──► Cards, Modal, Nav all use accent colors
Navbar Design ─┘    (do color scheme first or in parallel with design tokens)

Cards Redesign ──► Modal Improvements (modal inherits card data/images)
Page Transitions ── Independent (can be done anytime)
Content Update ──── Independent (can be done anytime once content is provided)
```

## Recommended Order of Execution

1. **Color Scheme** — foundational; affects everything else visually
2. **Navbar Redesign** — top-level UI, sets the tone
3. **Project Cards Redesign** — main content area on index page
4. **Modal Improvements & Gallery** — enhances the cards
5. **Navigation & Page Transitions** — polish layer
6. **Content Update** — final pass once design is locked in

---

## Considerations

- **Brutalist button style** — A bold dark button with white inner border, red box-shadow offset, and glare sweep on hover. Could be used as an alternative hero CTA or elsewhere on the site. Reference: https://uiverse.io/0xnihilism/fast-cat-82
