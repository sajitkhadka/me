# 0009 — Add /projects/[slug] case-study pages

**Status:** done
**Type:** feature
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

Many projects are private or have no public URL (English Communication Trainer, Filekeeper, AI Interview Coach, the home k3s platform). A link is not enough. Each of the best 3–4 needs a short page: the problem, how it works, a diagram or screenshot, what was hard, and links.

Cards from [0008](0008-apps-page-cards.md) should link to these pages.

- [x] Route `/projects/[slug]` renders a project page
- [x] Pages written for: the home k3s platform, SyncToDo, English Communication Trainer, plus one more
- [x] Each page: problem, approach, stack, one decision and why, link to repo if public
- [x] Listed in the sitemap

## How to research

Project `README.md` and `docs/adr/` in each repo (sync-todo has 26 ADRs, filekeeper 13). `deployment/ARCHITECTURE.md` for the k3s story.

## How to solve

Add a "Project" `BlogType` and reuse the existing editor. This is simpler than adding MDX files.

## Notes

- Decision: case studies are typed data in `config/projects.ts` rendered by one page, not a new BlogType, because the database cannot be edited from here. Content is edited in git.
- Written: home k3s platform, SyncToDo, English Communication Trainer, FileKeeper. Facts were taken from each repo's README and decision records; no internal hostnames or personal data.
- Repo link shown only for the public repos.
