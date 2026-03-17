# Copilot Instructions

## Project Overview

This is a portfolio website for Stella Victor, an Industrial Design student at LTH (Lund University). It is a React + TypeScript single-page app built with Vite and deployed to GitHub Pages.

## Architecture

- **Vite + React 19 + TypeScript** — project scaffolded with Vite; no CRA.
- `index.html` — Vite entry point at project root (loads `src/main.tsx`)
- `src/main.tsx` — React entry; renders `<App />` into `#root`
- `src/App.tsx` — Main layout composing all sections and dividers
- `src/index.css` — All styles in one file; design tokens (colors, spacing, fonts) defined as CSS custom properties in `:root`
- `src/components/` — One component per section:
  - `Navbar.tsx` — Fixed nav with scroll detection, mobile toggle, active link tracking, Lenis smooth scrolling
  - `Hero.tsx` — Hero section with staggered `--delay` CSS animations
  - `SectionDivider.tsx` — Reusable SVG wave divider
  - `WorkSection.tsx` — "Selected Work" bento grid section, manages modal state
  - `ProjectCard.tsx` — Individual bento tile with scale-in animation and overlay
  - `ProjectModal.tsx` — Modal overlay with image gallery (prev/next/dots/keyboard nav)
  - `AboutSection.tsx` — About Me section with slide-in animations
  - `ResumeSection.tsx` — Resume with education, experience, skills, engagements
  - `ContactSection.tsx` — Contact form (Formspree) + email/LinkedIn links
  - `Footer.tsx` — Simple footer
- `src/hooks/` — Custom React hooks:
  - `useLenis.ts` — Initializes Lenis smooth scroll, returns ref to Lenis instance
  - `useScrollAnimation.ts` — IntersectionObserver-based fade-in/scale-in animations
  - `useParallax.ts` — Parallax transform on scroll via Lenis
- `src/data/projects.ts` — Typed project data array (title, description, details, images)
- `public/images/` — Static image assets served by Vite
- `project.md`, `resume.md` — Source content files

## Build & Deploy

- **Dev server**: `npm run dev` — starts Vite dev server with HMR
- **Build**: `npm run build` — TypeScript check + Vite production build → `dist/`
- **Preview**: `npm run preview` — serves the built `dist/` locally
- **Deploy**: Automatic via GitHub Actions (`.github/workflows/deploy.yml`) on push to `main`. Builds the app and deploys `dist/` to GitHub Pages.
- `vite.config.ts` sets `base: '/Stellas-Portfolio/'` for the GitHub Pages subpath.

## Page Structure

The navbar links to anchor sections: **My Work** (`#work`), **About Me** (`#about`), **Contact** (`#contact`).

### Bento Grid (Work Section)
- `.projects-grid.bento` uses CSS Grid (3 columns, `grid-auto-rows: 240px`)
- The first card has `.bento-featured` class spanning 2 columns × 2 rows
- Remaining cards are equal-size tiles
- Responsive: 2 columns at 900px, 1 column at 600px

### Project Modal
- Side-by-side layout (`.modal-inner` grid): image/gallery on left, details on right
- Supports multi-image galleries with prev/next arrows, dots, and keyboard navigation
- Opens on card click; closes on ✕, backdrop click, or Escape key
- Body scroll locks when modal is open

## Key Conventions

- **Design tokens**: All colors, sizing, and typography are driven by CSS custom properties in `:root` at the top of `src/index.css`. Always use these variables rather than hard-coding values.
  - Accent: `--color-accent: #9B111E` (Business Red), `--color-accent-hover: #7C0A02` (Barn Red)
  - Backgrounds: `--color-bg: #fafafa`, `--color-bg-alt: #f5eced`
- **CSS class names are critical**: The global CSS file targets class names directly. Components must preserve exact class names.
- **Responsive breakpoints**: 900px (bento → 2 col, about section stacks), 768px (mobile nav hamburger, resume/contact stack), 600px (bento → 1 col), 480px (smaller hero text)
- **Animations**: Scroll-triggered fade-ins use `.fade-in` / `.scale-in` / `.slide-in-left` / `.slide-in-right` classes added by components, transitioning to `.visible` via IntersectionObserver. New sections should follow this pattern.
- **Font**: Inter via Google Fonts, loaded in `index.html`. The `--font-family` custom property includes a system font fallback stack.
- **Contact form**: Submits to Formspree (`https://formspree.io/f/{form-id}`). The form ID needs to be replaced with a real endpoint.
- **Content language**: The Shiro project uses Swedish text — do not translate it. Other content is in English.
- **Lenis**: Installed as npm package (`lenis`), initialized via `useLenis` hook.
- **Images**: Stored in `public/images/`, referenced via `import.meta.env.BASE_URL` for correct path resolution on GitHub Pages.

## Hosting

The site is deployed to GitHub Pages via GitHub Actions. The live URL is `https://maxsoller.github.io/Stellas-Portfolio/`.
