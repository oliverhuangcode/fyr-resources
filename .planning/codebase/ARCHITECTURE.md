# Architecture

## Core Pattern: Content-First Static Site

All curriculum data lives in `data/`. Components are content-agnostic rendering engines — they display whatever is in the data files. Adding content never requires component changes.

## Data Flow

```
data/tracks.ts
data/lessons.ts      →  page components  →  rendered HTML
data/tickets.ts

hooks/useProgress.ts  →  localStorage     →  client-side completion state
```

Pages are Server Components by default (Next.js App Router). Only components that read localStorage must be Client Components (`'use client'`):
- `hooks/useProgress.ts` — must be client-side
- Any component that calls `useProgress` — must be `'use client'`
- Static data pages (track list, lesson content) — can be Server Components reading from `data/`

## Progress Logic

```
localStorage['unlockedLessons'] = ['js-variables']  // Stage 1 seeded on first load

User clicks "Mark complete" on lesson X:
  1. completedLessons.push(X)
  2. Find next lesson in track's lesson[] array after X
  3. unlockedLessons.push(nextLesson.id)
  4. Persist both arrays to localStorage

isLocked (runtime, not stored):
  lesson.id NOT in unlockedLessons → visually muted, no mark-complete button
  lesson.id IN unlockedLessons     → normal card, mark-complete button available
  lesson.id IN completedLessons    → completed state (checkmark, button disabled)
```

## Routing

| Route | Type | Notes |
|-------|------|-------|
| `/` | Server Component | Reads `data/tracks.ts` at build time |
| `/tracks` | Server Component | Reads `data/tracks.ts` at build time |
| `/tracks/[trackId]` | Mixed | Track data server; progress state client |
| `/lessons/[id]` | Mixed | Lesson data server; mark-complete client |
| `/tickets/[id]` | Mixed | Ticket data server; mark-complete client |

## Static Export

`next.config.js` sets `output: 'export'`. All dynamic routes use `generateStaticParams()` to pre-render every lesson and ticket at build time.
