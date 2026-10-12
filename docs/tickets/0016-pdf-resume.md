# 0016 — Add a print-friendly PDF resume

**Status:** open
**Type:** feature
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)
**Blocked by:** [0003](0003-update-resume-data.md)

## Description

`/resume` is an interactive page with animated stats. There is no clean version to download or print. Recruiters usually want a PDF.

- [ ] "Download PDF" button on `/resume`
- [ ] PDF is one or two pages, plain, with no phone number
- [ ] PDF is generated from the same resume data, so it never drifts

## How to solve

Add a `/resume/print` route with print CSS, then either use the browser's print-to-PDF or generate the file at build time. The `ats-resume` project in this folder already renders a resume object to PDF and may be reusable.
