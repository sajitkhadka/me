# 0002 — Replace job-hunt card with current-role hero

**Status:** done
**Type:** feature
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

The home page (`app/page.tsx`) shows a card: "Open to New Opportunities", an "Available Now" badge and "actively seeking a Senior Software Engineering position". This is no longer true. Sajit has worked at Perceptyx (integrations team) since April 2026.

Replace it with a short intro of who he is now, then links to projects, blog and resume.

- [x] Hero says what he does today, in two or three sentences
- [x] No "Available Now" badge or "seeking" wording
- [x] One quiet line: not job-hunting, happy to chat (mailto link)
- [x] Featured projects (3–4) and latest posts shown below the hero
- [x] Works in light and dark mode and at phone width

## How to solve

Suggested copy: "I build integrations and event-driven backend systems. Currently at Perceptyx, connecting customers' HR and recruiting systems to an employee-survey platform. Outside work I run a home k3s cluster and build tools for myself."

1. Remove the `Card` block and the inline SVGs in `app/page.tsx`.
2. Add a hero and a featured-projects row (data from the apps/projects list, see 0007 and 0009).
3. Keep the "Explore my blog" and apps buttons.

## Notes

- Hero copy is the suggested text from this ticket. Latest posts load from the database and the section is hidden if the query fails or returns nothing.
- Not viewed in a browser (dependencies cannot be installed here).
