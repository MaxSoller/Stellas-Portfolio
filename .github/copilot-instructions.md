# Copilot Instructions

## Project Overview

This is a static portfolio website for Stella Victor, an Industrial Design student at LTH (Lund University). It is a single-page site with no build tools, no package manager, and no framework — just vanilla HTML, CSS, and JavaScript served via GitHub Pages.

## Architecture

- `index.html` — Single-page layout with anchor-linked sections in this order: Hero, Work (bento grid), About Me, Resume, Contact, Footer
- `styles.css` — All styles in one file; design tokens (colors, spacing, fonts) are defined as CSS custom properties in `:root`
- `script.js` — Vanilla JS handling: mobile nav toggle, scroll-based fade-in animations (IntersectionObserver), staggered card animations, project card hover overlays, active nav tracking, navbar scroll behaviour, image gallery logic, and project detail modal
- `images/` — Static assets (`shiro.png`, `Shiro2.png`, `about.png`). Some project cards still use placeholder `<div>`s
- `about.html` — Unused legacy file from a previous multi-page layout (can be deleted)
- `project.md`, `resume.md` — Source content files with project details (Swedish) and resume data

## Page Structure

The navbar links to anchor sections: **My Work** (`#work`), **About Me** (`#about`), **Contact** (`#contact`).

### Bento Grid (Work Section)
- `.projects-grid.bento` uses CSS Grid (3 columns, `grid-auto-rows: 240px`)
- The first card has `.bento-featured` class spanning 2 columns × 2 rows
- Remaining cards are equal-size tiles
- Responsive: 2 columns at 900px, 1 column at 600px

### Project Modal
- Side-by-side layout (`.modal-inner` grid): image/gallery on left, details on right
- Supports multi-image galleries with prev/next arrows and dots (gallery controls only appear in modal, not on cards)
- Opens on card click; closes on ✕, backdrop click, or Escape key
- Body scroll locks when modal is open

### Gallery System
- Multiple `<img class="gallery-slide">` inside `<div class="project-gallery">`
- First slide gets `.active` class
- `initGallery()` function in JS creates navigation arrows and dots
- Gallery is only initialized when opened in the modal

## Key Conventions

- **Design tokens**: All colors, sizing, and typography are driven by CSS custom properties in `:root` at the top of `styles.css`. Always use these variables rather than hard-coding values.
  - Accent: `--color-accent: #9B111E` (Business Red), `--color-accent-hover: #7C0A02` (Barn Red)
  - Backgrounds: white and light gray (`--color-bg: #fafafa`, `--color-bg-alt: #f0efed`)
- **No build step**: There is no bundler, transpiler, or preprocessor. Changes to HTML/CSS/JS take effect immediately.
- **Responsive breakpoints**: 900px (bento → 2 col, about section stacks), 768px (mobile nav hamburger, resume/contact stack), 600px (bento → 1 col), 480px (smaller hero text)
- **Animations**: Scroll-triggered fade-ins use `.fade-in` class added by JS (IntersectionObserver), transitioning to `.visible`. Project cards have staggered delays. New sections or cards should follow this pattern.
- **Font**: Inter via Google Fonts, loaded in `<head>`. The `--font-family` custom property includes a system font fallback stack.
- **Contact form**: Submits to Formspree (`https://formspree.io/f/{form-id}`). The form ID in `index.html` needs to be replaced with a real endpoint.
- **Content language**: The Shiro project uses Swedish text — do not translate it. Other content is in English.
- **JS guards**: Modal code is wrapped in `if (modal)` checks; navbar scroll behaviour checks for `.hero` element. This makes the JS resilient if elements are missing.

## Hosting

The site is deployed to GitHub Pages from the repository root. The live URL is `https://maxsoller.github.io/Stellas-Portfolio/`.
