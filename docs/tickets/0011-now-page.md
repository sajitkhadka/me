# 0011 — Add a /now page

**Status:** done
**Type:** feature
**Created:** 2026-10-12
**Parent:** [0001](0001-portfolio-refresh.md)

## Description

A small page that says what Sajit is working on and learning right now. It keeps the site feeling current without rewriting other pages.

- [x] `/now` page with a "last updated" date
- [x] Linked from the nav or footer
- [x] Content is public-safe (no employer internals)

## How to solve

Add a "Now" blog post type (same approach as About) so it can be edited in the editor. Suggested sections: Work, Building at home, Learning, Reading.

## Notes

- Decision: the page is written in code (`app/now/page.tsx`), not as a new blog post type, so it needs no database change. Update the text and `lastUpdated` date by hand. No Reading section: I do not know what Sajit is reading.
