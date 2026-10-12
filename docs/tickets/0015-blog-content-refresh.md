# 0015 — Blog: republish or link Confluence posts, reposition old notes

**Status:** blocked
**Type:** chore
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

**Blocked:** tagging old posts and writing the new k3s post need the database and the editor, which can only be done by Sajit.

The blog's newest post is from 2025-02-28 and most are command cheat-sheets (Docker, Kubernetes, Prisma, a TV setup). Meanwhile `career/writing/00-index.md` lists stronger posts from Dec 2025 – Jan 2026 on Confluence:

- Monitoring, metrics and failure handling in distributed systems
- Why a Postgres database might hit 250 connections
- Accessing a k3s cluster from Windows and GitHub Actions
- Mastering K3s deployment with GitHub Actions
- Postgres Docker backup script on Windows, Passwordless SSH

- [x] The strongest 3–5 Confluence posts are republished here or linked from the blog
- [ ] Old cheat-sheet posts tagged "notes" so they do not dominate
- [x] Blog page intro says what the blog is about
- [ ] A post about the k3s / Argo CD / tag-to-deploy setup is planned

## How to solve

Copying the Confluence text into the editor keeps SEO on this domain. Add a "Originally published on Confluence" link if wanted.

## Notes

- Decision: linked rather than copied. The five posts from the ticket are listed in `config/writing.ts` and shown on page 1 of /blog, linking to Confluence. Copying the text into the editor needs the database and the editor, which I cannot reach from here.
- Left open for Sajit: tag the old cheat-sheet posts "notes" (database), and write the k3s / Argo CD / tag-to-deploy post. The k3s platform case study at /projects/home-k3s-platform is a starting point.
