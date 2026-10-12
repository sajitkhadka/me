# 0013 — Refresh theme: one accent, body font, avatar

**Status:** open
**Type:** feature
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

The look is generic. `app/globals.css` uses a soft-blue palette with several unrelated greys. `app/layout.tsx` loads only JetBrains Mono, so body text is monospace everywhere. The home hero has no photo, and `public/avatar.png` is 474 KB.

- [ ] One clear accent colour, checked for contrast in light and dark
- [ ] A readable body font (sans or serif). Keep mono for code and small labels
- [ ] Avatar resized and served through `next/image`
- [ ] Consistent card, button and spacing style across home, apps, blog and resume
- [ ] Subtle hover/entry motion only (framer-motion is already installed)

## How to solve

1. Pick the accent and update the CSS variables in `globals.css`.
2. Load a body font with `next/font` in `layout.tsx` and set it as the default.
3. Compress the avatar (target under 100 KB) and add a real photo if available.
