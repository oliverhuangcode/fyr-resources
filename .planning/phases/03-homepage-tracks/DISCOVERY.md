# Phase 3 Discovery — Homepage & Tracks

## Phase Goal

Build the three "browse" screens: homepage hero + track cards, all-tracks page, and track detail page with lesson list and progress bar.

## Current State

After Phase 2:
- `types/index.ts` — Track, Lesson, Resource, Ticket interfaces
- `data/tracks.ts` — 1 backend track (5 lessons, 1 ticket)
- `data/lessons.ts` — 5 full lessons
- `data/tickets.ts` — 1 ticket
- `hooks/useProgress.ts` — localStorage hook, CoVe-verified
- `app/layout.tsx` — Geist font, bg-base, Nav
- `components/Nav.tsx` — wordmark + Tracks link
- `app/page.tsx` — stub only
- `app/tracks/page.tsx` — stub only
- No `app/tracks/[trackId]/page.tsx` yet
- No TrackCard, LessonCard, or ProgressBar components

## API decisions

### Server vs Client split

- `app/page.tsx` → **Server Component** (reads `data/tracks.ts` directly, no browser APIs)
- `app/tracks/page.tsx` → **Server Component** (same)
- `app/tracks/[trackId]/page.tsx` → **Server Component** for static generation; child `LessonList` client component for progress
- `components/TrackCard.tsx` → **Server Component** (pure display, no progress needed here)
- `components/LessonCard.tsx` → **Client Component** (`'use client'`) — receives lesson + progress props from parent
- `components/ProgressBar.tsx` → pure display, no browser APIs needed — **Server-compatible** (accept props, no hooks)

### Static params

`app/tracks/[trackId]/page.tsx` needs `generateStaticParams()`:
```ts
export function generateStaticParams() {
  return tracks.map(t => ({ trackId: t.id }))
}
```

### LessonCard approach

Track detail page is a Server Component that renders. The lesson list needs progress state from useProgress. Two options:
1. Make the whole track page a client component
2. Extract a client `LessonList` component that wraps `useProgress` and renders LessonCards

Option 2 is better — page stays statically renderable; only the interactive list is client-side.

### ProgressBar

Accepts `completed: number` and `total: number` props. Renders a simple bar using Tailwind token `accent` for fill. No hooks needed.

### Design notes (from CLAUDE.md)

- `bg-base` — page background
- `bg-surface` — cards/panels
- `accent` — CTA, active states
- `text-primary` — body text
- `text-muted` — secondary text
- `border-subtle` — borders/dividers
- No `bg-white`, no `bg-gray-*`, no gradients, no shadows
- No component libraries

### Data helpers

Track detail page needs:
- The Track object (from `data/tracks.ts` by `trackId`)
- Lessons for the track (from `data/lessons.ts` filtered by `trackId`, sorted by `stage`)
- The track's ticket IDs

## Plan Split

### Plan 01 — Homepage, TrackCard, All-Tracks Page

Files:
- `components/TrackCard.tsx`
- `app/page.tsx` (replace stub)
- `app/tracks/page.tsx` (replace stub)

### Plan 02 — Track Detail Page, LessonCard, ProgressBar

Files:
- `components/ProgressBar.tsx`
- `components/LessonCard.tsx`
- `components/LessonList.tsx` (client wrapper for track detail page)
- `app/tracks/[trackId]/page.tsx`
