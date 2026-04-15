# Phase 5 Discovery — Polish & Verification

## Phase Goal

End-to-end validation that the full learner journey works, design is consistent, mobile is solid, and the build is clean.

## Current State (entering Phase 5)

- 12 static pages build cleanly
- ESLint: 0 warnings/errors
- TypeScript: 0 errors
- All 5 screens implemented: `/`, `/tracks`, `/tracks/[trackId]`, `/lessons/[id]`, `/tickets/[id]`
- localStorage progress: completeLesson, completeTicket, unlock logic, hydration guard

## Gaps Found During Review

### 1. Missing focus-visible styles (accessibility)

PRD §6: "keyboard-navigable, visible focus states". Current interactive elements have hover styles but no explicit `focus-visible` ring. Tailwind v3 preflight removes browser defaults for some elements. Fix: global CSS rule in `globals.css`:

```css
@layer base {
  a:focus-visible,
  button:focus-visible {
    outline: 2px solid theme('colors.accent');
    outline-offset: 2px;
  }
}
```

This covers: Nav links, TrackCard/LessonCard/TicketCard/ResourceLink anchors, MarkLessonComplete/MarkTicketComplete buttons, breadcrumb links — all in one rule.

### 2. Missing README.md

PRD §8 / ROADMAP Phase 5: "README updated with run instructions". No README.md exists at project root.

### 3. Content authoring test needed

PRD §8 success metric: "Adding a lesson to `data/lessons.ts` renders correctly". Test: append a dummy lesson, run `npm run build`, confirm it generates a static page, then remove it and rebuild to clean state.

## No other gaps found

- All token constraints followed (no hex hardcoding, no bg-white, no bg-gray-*)
- generateStaticParams present on all dynamic routes
- useProgress CoVe-verified
- LessonCards link even when locked
- All sections use semantic HTML (`<section>`, `<h1>`/`<h2>`, `<ul>`/`<ol>`, `<nav>`)

## Plan Split

Single plan covers all Phase 5 work:

### Plan 01 — Accessibility Fix, Content Authoring Test, README, Final Build

Files:
- `app/globals.css` — add focus-visible rule
- `README.md` — create with run instructions
- `data/lessons.ts` — temporary dummy lesson (added and removed within the plan)
