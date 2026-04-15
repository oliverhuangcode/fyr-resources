# Phase 4 Discovery — Lesson & Ticket Pages

## Phase Goal

Build the core learning experience: the lesson detail page (content, resources, checkpoint, mark complete) and the ticket detail page (context, requirements, stretch goals, DoD, mark complete).

## Current State

After Phase 3:
- All browse screens complete: homepage, all-tracks, track detail
- `hooks/useProgress.ts` — `completeLesson`, `completeTicket`, `isLessonCompleted`, `isTicketCompleted` all available
- `data/lessons.ts` — 5 lessons with `skills[]`, `resources[]`, `checkpoint`
- `data/tickets.ts` — 1 ticket with `requirements[]`, `stretchGoals[]`, `definitionOfDone`, `difficulty`
- No `app/lessons/[id]/` or `app/tickets/[id]/` routes yet

## Architecture Decisions

### Client/Server split

The lesson and ticket pages are mostly static content — but the MarkComplete button needs `useProgress` (localStorage). Two options:

1. Make the whole page `'use client'` — simpler but loses static generation benefits
2. Extract the interactive button as a client component, keep the page as a server component

**Decision**: Option 2. Pages are Server Components with `generateStaticParams`. The MarkComplete button is an isolated client component that only needs the lesson/ticket ID + `useProgress`.

### New components

- `components/ResourceLink.tsx` — Server-compatible. Props: `resource: Resource`. External link opener (`target="_blank" rel="noopener noreferrer"`), type badge (Video / Reading / Interactive), styled with Tailwind tokens.
- `components/MarkLessonComplete.tsx` — Client Component. Props: `lessonId: string`. Calls `completeLesson` on click. Button shows "Mark Complete" / "✓ Completed" state. Waits for `hydrated` before rendering to avoid flash.
- `components/MarkTicketComplete.tsx` — Client Component. Props: `ticketId: string`. Same pattern as MarkLessonComplete.
- `components/TicketCard.tsx` — Server-compatible. Props: `ticket: Ticket`. Displays ticket title, difficulty badge. Links to `/tickets/{id}`. Will replace the raw ticket link in `app/tracks/[trackId]/page.tsx`.

### Static params

Both dynamic routes need `generateStaticParams()`:

```ts
// app/lessons/[id]/page.tsx
export function generateStaticParams() {
  return lessons.map(l => ({ id: l.id }))
}

// app/tickets/[id]/page.tsx
export function generateStaticParams() {
  return tickets.map(t => ({ id: t.id }))
}
```

### Lesson page layout

- Breadcrumb back to track: `← Backend Development` (link to `/tracks/{lesson.trackId}`)
- Stage badge + duration + title
- Description paragraph
- Skills list ("You'll learn")
- Resources section with `ResourceLink` per resource
- Checkpoint block — clearly labelled "Self-check" with the checkpoint question
- `MarkLessonComplete` button fixed or inline at bottom

### Ticket page layout

- Breadcrumb back to track: `← Backend Development`
- Title + difficulty badge
- Context paragraph
- Requirements list (checklist style)
- Stretch Goals list
- Definition of Done block
- `MarkTicketComplete` button

### Type badge colours (ResourceLink)

- `video` → accent-coloured badge
- `reading` → muted border badge
- `interactive` → subtle border badge, different label

No hardcoded hex — use only Tailwind tokens.

## Plan Split

### Plan 01 — Lesson Detail Page

Files:
- `components/ResourceLink.tsx`
- `components/MarkLessonComplete.tsx`
- `app/lessons/[id]/page.tsx`

### Plan 02 — Ticket Detail Page + TicketCard

Files:
- `components/TicketCard.tsx`
- `components/MarkTicketComplete.tsx`
- `app/tickets/[id]/page.tsx`
- Update `app/tracks/[trackId]/page.tsx` to use TicketCard (minor)
