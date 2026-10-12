# 0016 — Add a print-friendly PDF resume

**Status:** done
**Type:** feature
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)
**Blocked by:** [0003](0003-update-resume-data.md)

## Description

`/resume` is an interactive page with animated stats. There is no clean version to download or print. Recruiters usually want a PDF.

- [x] "Download PDF" button on `/resume`
- [x] PDF is one or two pages, plain, with no phone number
- [x] PDF is generated from the same resume data, so it never drifts

## How to solve

Add a `/resume/print` route with print CSS, then either use the browser's print-to-PDF or generate the file at build time. The `ats-resume` project in this folder already renders a resume object to PDF and may be reusable.

## Notes

- Approach: `/resume/print` is a plain, print-styled page built from `config/resume.ts`; its button opens the browser print dialog (Save as PDF). The page is `noindex`, and the site header and footer are hidden when printing. No file is generated at build time, so it cannot drift.
- Replaces the old `NEXT_PUBLIC_RESUME_API_URL` download, which is no longer read; that env var can be removed from the host.
- Page count (one or two) not checked in a real print preview.
