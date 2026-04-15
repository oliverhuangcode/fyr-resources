# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

MAC Learn — a self-paced backend development curriculum for Monash Association of Coding (MAC) members. Modelled on The Odin Project. No backend, no auth; progress is persisted in localStorage. Content-first: adding a lesson, ticket, or track requires only editing a data file.

## Commands

```bash
npm run dev        # start dev server on :3000
npm run build      # production build (static export to out/)
npx tsc --noEmit   # type-check only
npm run lint       # ESLint
```

## Stack

- Next.js 14 App Router (no `src/`, static export `output: 'export'`)
- TypeScript strict
- Tailwind CSS with custom theme tokens
- Geist font via `next/font/google`
- localStorage for progress (no backend)

## Architecture

### Content-first data flow

`data/tracks.ts` → `data/lessons.ts` → `data/tickets.ts` are the single source of truth. Components are content-agnostic. Pages are statically renderable; every dynamic route (`/lessons/[id]`, `/tickets/[id]`) uses `generateStaticParams()`.

Client/server split:
- **Server Components**: pages that only read from `data/` (homepage, track list)
- **Client Components** (`'use client'`): anything that calls `useProgress`, `usePathname`, or browser APIs

### Progress logic (`hooks/useProgress.ts`)

Three localStorage keys:
- `completedLessons` — `string[]` of completed lesson IDs
- `unlockedLessons` — `string[]` of lesson IDs available for completion (Stage 1 seeded by default)
- `completedTickets` — `string[]` of completed ticket IDs

Completing lesson N → adds lesson N+1 (within same track) to `unlockedLessons`. Missing localStorage = fresh start (no crash). `isLocked` on a lesson is **not stored in data** — it is derived at runtime: a lesson is unlocked if its `id` is in `unlockedLessons`. All lesson content is always readable regardless of lock state.

### Routing

```
/                           Homepage — hero + track cards
/tracks                     All tracks
/tracks/[trackId]           Lesson list + progress bar for a track
/lessons/[id]               Lesson detail — content, resources, checkpoint, mark complete
/tickets/[id]               Ticket detail — requirements, stretch goals, DoD, mark complete
```

## Design System

All colours via custom Tailwind tokens — **never hardcode hex values in components**.

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-base` | `#1C1C1C` | Page background |
| `bg-surface` | `#242424` | Cards, panels |
| `accent` | `#F5C518` | CTA buttons, active states |
| `text-primary` | `#FFFFFF` | Body text |
| `text-muted` | `#888888` | Secondary text |
| `border-subtle` | `#2E2E2E` | Borders, dividers |

Rules: Tailwind only (no inline styles, no CSS modules). No white backgrounds (`bg-white` is banned). No gradients. No shadows. No component libraries (no shadcn, no radix).

## Data Shapes

```ts
Track:   { id, title, description, icon, lessons: string[], tickets: string[] }
Lesson:  { id, trackId, stage, title, duration, description, skills[], resources[], checkpoint }
         // isLocked is NOT stored — derived from useProgress at runtime
Resource: { title, url, type: 'video' | 'reading' | 'interactive' }
Ticket:  { id, trackId, title, context, requirements[], stretchGoals[], definitionOfDone, difficulty }
```

## GSD Planning

This project uses a GSD structure in `.planning/`:
- `.planning/specs/PRD.md` — full product requirements
- `.planning/ROADMAP.md` — 5-phase breakdown
- `.planning/STATE.md` — current phase/plan/progress
- `.planning/phases/` — per-phase plan files (`{XX}-{YY}-PLAN.md`)

Ralph loop config in `.ralph/` and `.ralphrc`. To run autonomously: `ralph --monitor`
