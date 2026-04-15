# Phase 2 Discovery: Data Layer

## Goal

Define all TypeScript types and populate the three data files with the full backend track content (5 lessons, 1 ticket, 1 track). Implement `useProgress` hook with localStorage read/write.

## Findings

### Types (already complete)
`types/index.ts` was created in Phase 1 Plan 02 and contains all four interfaces:
- `Resource` — `{ title, url, type }`
- `Lesson` — `{ id, trackId, stage, title, duration, description, skills[], resources[], checkpoint }`
- `Track` — `{ id, title, description, icon, lessons[], tickets[] }`
- `Ticket` — `{ id, trackId, title, context, requirements[], stretchGoals[], definitionOfDone, difficulty }`

### Data Files Needed

Three data files must be created: `data/tracks.ts`, `data/lessons.ts`, `data/tickets.ts`.

**Track**: One track — "Backend Development" with 5 lessons and 1 ticket.

**Lessons** (5, all in `trackId: 'backend'`):
1. `backend-01` — Stage 1: Introduction to Node.js
2. `backend-02` — Stage 2: HTTP & REST fundamentals
3. `backend-03` — Stage 3: Express basics
4. `backend-04` — Stage 4: Working with data (JSON, in-memory)
5. `backend-05` — Stage 5: Building your first REST API

**Ticket**: `backend-ticket-01` — Build a To-Do REST API (starter difficulty)

### useProgress Hook

**localStorage keys**:
- `completedLessons: string[]`
- `unlockedLessons: string[]` — seeded with `['backend-01']` (Stage 1) on fresh start
- `completedTickets: string[]`

**Unlock logic**: Completing lesson N → find the next lesson ID in the track's `lessons[]` array → add to `unlockedLessons`.

**CoVe targets**:
- Fresh start: `unlockedLessons` seeded with `backend-01`
- Missing localStorage: no crash, treat as fresh start
- Completing `backend-01` → `backend-02` added to `unlockedLessons`
- Completing `backend-05` (last) → no crash, no new lesson added
- Already completed: idempotent — no duplicates in arrays
- Server-side render guard: `typeof window === 'undefined'` check before accessing localStorage

## Plan Count

One plan covers all deliverables (types already done; data + hook is one coherent unit).
