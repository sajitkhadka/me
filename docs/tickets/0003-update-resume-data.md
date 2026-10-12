# 0003 — Update resume data to match career history

**Status:** open
**Type:** chore
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

The resume data (seeded by `scripts/populate-resume.js`, stored as JSON in `User.resume`) is out of date. Known differences from the `career` repo:

- Rakuten is shown as "Jul 2024 – Present", Senior. Career says Jul–Dec 2025, Software Engineer – Backend.
- Guhuza ends "Jul 2024". Career says Nov 2021 – Jul 2025.
- Perceptyx (Software Engineer – Integrations, Apr 2026 – present) is missing.
- Humber College instructor (part-time, Sep 2023 – Dec 2024) is missing.
- Skills miss Go, Terraform, SQS, Merge.dev, Datadog, GitOps.
- The footer says "Open to exciting opportunities".
- Stats tiles ("100K+ users", "45% avg performance gain", "99.9% uptime") need a source.

- [ ] Experience list, titles and dates match `career/README.md`
- [ ] Perceptyx and Humber entries added
- [ ] Skills updated
- [ ] Stats kept only if Sajit can back them up
- [ ] Footer line updated (no "open to opportunities")
- [ ] No confidential employer details (see epic)

## How to research

- `career/README.md` timeline, `career/organizations/*`, `career/profile/summary.md`.
- Ask Sajit which city to show. `career` says Loma Linda, CA and the seed says Toronto.

## How to solve

1. Edit the `resumeData` object in `scripts/populate-resume.js`.
2. Run it against a dev database first, then production. It writes to whatever `DATABASE_URL` points at.
