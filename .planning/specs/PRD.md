# PRD: MAC Learn

## 1. Overview

MAC Learn is a self-paced backend development curriculum for Monash Association of Coding (MAC) members in the early stages of their programming journey. Modelled on The Odin Project, it presents content as a series of tracks, each composed of ordered lessons and hands-on tickets. Learners progress linearly through lessons by clicking "Mark complete", with all content always readable (no hard gating). Progress is stored in localStorage — no backend, no auth. The platform is content-first: adding a new lesson, ticket, or track requires only appending to a data file.

---

## 2. Target Users

| User Type | Description | Primary Need |
|-----------|-------------|--------------|
| First-year MAC learner | Basic coding experience, no practical backend background. May be on mobile. | Follow a structured path from JS fundamentals to building a REST API |
| Returning learner | Has completed some lessons, comes back to continue | Pick up exactly where they left off via persistent localStorage progress |
| MAC content author | Projects lead or senior member adding curriculum | Append to `data/lessons.ts` or `data/tickets.ts` and have it appear with zero component changes |

---

## 3. User Stories

### Epic: Track Discovery

- **US-001**: As a learner, I want to see all available tracks on the homepage so I can understand what MAC Learn offers.
  - Acceptance Criteria:
    - [ ] Homepage shows at least one track card with title, description, and lesson count
    - [ ] Each track card links to the track's lesson list

- **US-002**: As a learner, I want to see a tracks overview page so I can browse all available tracks.
  - Acceptance Criteria:
    - [ ] `/tracks` shows all tracks defined in `data/tracks.ts`
    - [ ] Each track shows its title, description, lesson count, and ticket count

### Epic: Lesson Progression

- **US-003**: As a learner, I want to see all lessons in a track in order so I know what to work through.
  - Acceptance Criteria:
    - [ ] `/tracks/[trackId]` lists lessons in stage order
    - [ ] Each lesson card shows title, duration, stage number, and completion state
    - [ ] A progress bar shows how many lessons in the track are complete

- **US-004**: As a learner, I want to read a lesson's full content at any time regardless of my progress state.
  - Acceptance Criteria:
    - [ ] Any lesson is navigable directly (no hard content gate)
    - [ ] Locked lessons (not yet unlocked via progression) are visually distinguished but still readable

- **US-005**: As a learner, I want to mark a lesson as complete so I can track my progress.
  - Acceptance Criteria:
    - [ ] A "Mark complete" button appears on every lesson page
    - [ ] Clicking it adds the lesson ID to `completedLessons` in localStorage
    - [ ] The next lesson in the track is added to `unlockedLessons`
    - [ ] The button state updates immediately (no page reload)
    - [ ] If already complete, the button shows a completed state

- **US-006**: As a learner, I want to see the resources for a lesson (videos, readings, interactive tools) so I know what to study.
  - Acceptance Criteria:
    - [ ] Resources are listed with title, type badge, and external link
    - [ ] Type is visually distinguished: video / reading / interactive

- **US-007**: As a learner, I want to see the checkpoint question for a lesson so I can self-assess before moving on.
  - Acceptance Criteria:
    - [ ] Checkpoint text is displayed on the lesson page
    - [ ] It is clearly labelled as a self-check (not a required test)

### Epic: Ticket Access

- **US-008**: As a learner, I want to access a ticket at any time so I can attempt it when I feel ready.
  - Acceptance Criteria:
    - [ ] Tickets are always accessible — no completion gate
    - [ ] `/tickets/[id]` shows context, requirements, stretch goals, and definition of done
    - [ ] Difficulty badge is shown (starter / intermediate / advanced)

- **US-009**: As a learner, I want to mark a ticket as complete so I can track it in my progress.
  - Acceptance Criteria:
    - [ ] A "Mark complete" button on the ticket page
    - [ ] Adds ticket ID to `completedTickets` in localStorage

### Epic: Progress Persistence

- **US-010**: As a returning learner, I want my progress to be exactly where I left it when I come back.
  - Acceptance Criteria:
    - [ ] `completedLessons` and `unlockedLessons` persisted to localStorage on every update
    - [ ] On page load, progress is read from localStorage before first render

- **US-011**: As a learner whose localStorage has been cleared, I want the app to work without crashing.
  - Acceptance Criteria:
    - [ ] Missing localStorage is treated as a fresh start: Stage 1 unlocked by default
    - [ ] No errors thrown — app is fully functional from a clean state

### Epic: Content Authoring (Data-Only)

- **US-012**: As a MAC content author, I want to add a lesson by appending to `data/lessons.ts` only.
  - Acceptance Criteria:
    - [ ] New lesson appears in the correct track and stage with zero component changes

- **US-013**: As a MAC content author, I want to add a ticket by appending to `data/tickets.ts` only.
  - Acceptance Criteria:
    - [ ] New ticket appears linked to the correct track with zero component changes

---

## 4. Technical Requirements

### Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | Next.js 14 App Router | Static export, file-based routing, no server needed |
| Language | TypeScript | Type safety for the data layer |
| Styling | Tailwind CSS (custom theme tokens) | Utility-first, no component library overhead |
| Font | Geist via `next/font` | MAC design system |
| Persistence | localStorage | Zero backend; works offline |
| Deployment | Vercel or GitHub Pages | Static export |

### Architecture

- **Content-first**: All curriculum data lives in `data/`. Components are content-agnostic — they render whatever is in the data files.
- **No server state**: Every page is statically renderable. `useProgress` reads localStorage client-side only (wrapped in a `useEffect` or `'use client'` boundary).
- **Linear unlock model**: `completedLessons` (string[]) drives `unlockedLessons` (string[]). Stage 1 lesson ID is seeded into `unlockedLessons` by default. Completing lesson N adds lesson N+1 to `unlockedLessons` (within same track). Content is always readable regardless of unlock state.

### Data Model

| Entity | Key Fields | Relationships |
|--------|-----------|---------------|
| Track | `id, title, description, icon, lessons[], tickets[]` | Has many Lessons, has many Tickets |
| Lesson | `id, trackId, stage, title, duration, description, skills[], resources[], checkpoint` | Belongs to Track; `isLocked` is derived from `unlockedLessons`, not stored |
| Resource | `title, url, type: 'video' \| 'reading' \| 'interactive'` | Embedded in Lesson |
| Ticket | `id, trackId, title, context, requirements[], stretchGoals[], definitionOfDone, difficulty` | Belongs to Track |

Note: `isLocked` on Lesson is a runtime-derived boolean (not stored in data). A lesson is "unlocked" if its `id` is in `unlockedLessons` from localStorage.

### localStorage Keys

| Key | Type | Description |
|-----|------|-------------|
| `completedLessons` | `string[]` | IDs of lessons the learner has marked complete |
| `unlockedLessons` | `string[]` | IDs of lessons the learner can mark complete (seeded with Stage 1) |
| `completedTickets` | `string[]` | IDs of tickets marked complete |

### API Endpoints

None — fully static.

---

## 5. Screens & Navigation

### Screen Map

```
/                               Homepage — hero + track overview cards
/tracks                         All tracks grid
/tracks/[trackId]               Track detail — lesson list + progress bar
/lessons/[id]                   Lesson page — content, resources, checkpoint, mark complete
/tickets/[id]                   Ticket page — context, requirements, stretch goals, DoD
```

### Screen Descriptions

| Screen | Purpose | Key Components |
|--------|---------|----------------|
| `/` | First impression, entry point | Hero (headline, CTA), TrackCard grid |
| `/tracks` | Browse all tracks | TrackCard for each track in `data/tracks.ts` |
| `/tracks/[trackId]` | Track progress overview | ProgressBar, LessonCard list (ordered by stage) |
| `/lessons/[id]` | Core learning experience | Lesson metadata, ResourceLink list, Checkpoint block, MarkComplete button |
| `/tickets/[id]` | Hands-on challenge | Ticket context, requirements list, stretch goals, DoD, difficulty badge, MarkComplete button |

### Nav

Global top nav: MAC Learn wordmark (links to `/`), "Tracks" link, progress indicator (optional — lessons completed across all tracks).

---

## 6. Non-Functional Requirements

- **Responsive**: All screens must work at 375px (iPhone SE) and up. Mobile is required for MVP.
- **Static export**: `next export` must produce a deployable artifact with no Node.js server.
- **Offline**: All content is static; app works fully offline after first load.
- **Performance**: No external data fetching. Pages load instantly.
- **Accessibility**: Semantic HTML, keyboard-navigable, visible focus states, ARIA labels on icon-only buttons.
- **No dark-mode toggle**: Dark-only. No light mode.
- **No analytics**: No tracking scripts in MVP.

---

## 7. MVP Scope

### In Scope (MVP)

- Full backend track: 5 lessons + 1 starter ticket (all content in `data/`)
- All 5 screens implemented and responsive
- `useProgress` hook with localStorage persistence
- "Mark complete" on lessons and tickets
- Linear unlock logic (Stage 1 seeded; completing lesson N unlocks N+1)
- All lessons always readable regardless of unlock state
- Tailwind custom theme (bg-base, bg-surface, accent, text-primary, text-muted, border-subtle)
- Geist font, dark-only design

### Out of Scope (Post-MVP)

- Multiple tracks beyond the backend track
- Progress reset button
- Lesson search or filtering
- Social features (sharing progress, cohort view)
- Admin/authoring UI (data files are the authoring tool)
- Notifications or email reminders
- Server-side persistence or auth

---

## 8. Success Metrics

| Metric | Target | How Measured |
|--------|--------|--------------|
| Lesson completion | A learner can complete all 5 lessons end-to-end | Manual walkthrough |
| Ticket access | Ticket is accessible at any point in the journey | Manual test |
| Data authoring | Adding a lesson to `data/lessons.ts` renders correctly | Add a dummy lesson, verify render |
| Mobile usability | All screens usable at 375px | Browser dev tools + real device |
| Build | `npm run build` passes with no TypeScript errors | CI |

---

## 9. Open Questions

- Should the progress bar on `/tracks/[trackId]` count tickets or only lessons?
  - **Assumed**: Lessons only for now; tickets shown separately.
- Should locked (not-yet-unlocked) lessons show a visual lock icon or just a different card style?
  - **Assumed**: Different card style (muted, no "mark complete" button). No hard lock icon required.
- Should the Nav show a global completion count across tracks?
  - **Assumed**: Not in MVP. Nav is wordmark + Tracks link only.
