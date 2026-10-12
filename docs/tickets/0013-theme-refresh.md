# 0013 — Refresh theme: one accent, body font, avatar

**Status:** done
**Type:** feature
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

The look is generic. `app/globals.css` uses a soft-blue palette with several unrelated greys. `app/layout.tsx` loads only JetBrains Mono, so body text is monospace everywhere. The home hero has no photo, and `public/avatar.png` is 474 KB.

- [x] One clear accent colour, checked for contrast in light and dark
- [x] A readable body font (sans or serif). Keep mono for code and small labels
- [x] Avatar resized and served through `next/image`
- [x] Consistent card, button and spacing style across home, apps, blog and resume
- [x] Subtle hover/entry motion only (framer-motion is already installed)

## How to solve

1. Pick the accent and update the CSS variables in `globals.css`.
2. Load a body font with `next/font` in `layout.tsx` and set it as the default.
3. Compress the avatar (target under 100 KB) and add a real photo if available.

## Notes

- Accent is teal (light `174 75% 28%`, dark `172 60% 55%`); contrast is estimated (about 5:1 white on the light accent), not measured in a browser. Body font is Inter via `next/font`; JetBrains Mono is now the `font-mono` family only.
- Avatar is now `public/avatar.webp` (384 px, 28 KB, was 474 KB) and shows on the home hero and About page. The old PNG is deleted. It is still the illustrated avatar; a real photo is Sajit's call.
- The resume page was light-only slate/blue; it now uses theme tokens so it follows dark mode.
- Not viewed in a browser; please look at light and dark before shipping.
