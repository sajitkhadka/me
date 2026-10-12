# 0008 — Show app descriptions and screenshots on /apps

**Status:** open
**Type:** feature
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

`/apps` is a grid of icons and names. The `MyApp` table already has a `description` column, but `AppIcon` never shows it. A visitor cannot tell what each app does.

- [ ] Each app is a card: icon, name, one-line problem it solves, stack chips, links (live, repo)
- [ ] Optional screenshot
- [ ] Order stays controlled by `sortOrder`
- [ ] Works on phones

## How to solve

1. Add `stack`, `repoUrl` and `screenshot` to `db/schema/app.prisma` and add a migration.
2. Replace `AppIcon` with a card component (reuse `components/ui/card.tsx`).
3. Keep the framer-motion fade-in in `AppGrid`.
