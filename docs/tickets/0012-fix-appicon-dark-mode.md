# 0012 — Fix dark mode and random colours in AppIcon

**Status:** done
**Type:** bug
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

`app/apps/components/AppIcon.tsx` has two problems:

- It hardcodes `hover:bg-gray-100`, `text-gray-700` and `group-hover:text-gray-900`. In dark mode the name is dark grey on a dark background.
- When an app has no `color`, it picks one with `Math.random()`. A client component rendered on the server picks a different colour on the client, which causes a hydration warning and a colour flicker.

- [x] Text and hover colours use theme tokens (`text-foreground`, `bg-accent`, and so on)
- [x] Fallback colour is stable (for example derived from the app id)
- [ ] Checked in light and dark mode

## How to solve

1. Swap the grey classes for theme classes.
2. Replace `Math.random()` with a hash of `app.id` to pick from the colour list.

## Notes

- Not checked in a browser: dependencies cannot be installed here (the Tiptap Pro token is not set), so this was checked by reading the classes only. `bg-accent` and `text-foreground` are existing theme tokens.
