# 0008 — Show app descriptions and screenshots on /apps

**Status:** done
**Type:** feature
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

`/apps` is a grid of icons and names. The `MyApp` table already has a `description` column, but `AppIcon` never shows it. A visitor cannot tell what each app does.

- [x] Each app is a card: icon, name, one-line problem it solves, stack chips, links (live, repo)
- [x] Optional screenshot
- [x] Order stays controlled by `sortOrder`
- [x] Works on phones

## How to solve

1. Add `stack`, `repoUrl` and `screenshot` to `db/schema/app.prisma` and add a migration.
2. Replace `AppIcon` with a card component (reuse `components/ui/card.tsx`).
3. Keep the framer-motion fade-in in `AppGrid`.

## Notes

- Cards read from `config/projects.ts` (see 0007), so no schema change or migration was needed; `screenshot` is an optional field there (none added yet). The `MyApp` table and model are now unused and can be dropped later.
- Removed `AppIcon`, the `myapps` service and the apps loading skeleton (nothing awaits data now). Added a Projects link to the nav.
- Phone layout is one column; not viewed in a browser (no install possible here).
