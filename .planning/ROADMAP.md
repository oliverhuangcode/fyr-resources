# Roadmap — Milestone 1: MVP

## Progress

| Phase | Name | Status | Plans |
|-------|------|--------|-------|
| 1 | Infrastructure & Setup | Complete | 2 |
| 2 | Data Layer | Complete | 1 |
| 3 | Homepage & Tracks | Complete | 2 |
| 4 | Lesson & Ticket Pages | Complete | 2 |
| 5 | Polish & Verification | Complete | 1 |

---

### Phase 1: Infrastructure & Setup

**Goal**: Scaffold the Next.js project, configure Tailwind custom theme tokens, set up Geist font, create the global layout shell with Nav, and verify the dev server runs with the correct design baseline.

**Depends on**: None
**Research**: Unlikely (standard Next.js 14 + Tailwind setup)
**Traces to**: PRD §4 Stack, PRD §6 Non-Functional Requirements

**Deliverables**:
- Working `npm run dev` with dark background (#1C1C1C)
- `tailwind.config.ts` with all custom tokens (bg-base, bg-surface, accent, text-primary, text-muted, border-subtle)
- Geist font loaded via `next/font/google`
- `app/layout.tsx` with Nav component and font applied
- `components/Nav.tsx` — wordmark + Tracks link
- TypeScript strict mode, no build errors

---

### Phase 2: Data Layer

**Goal**: Define all TypeScript types and populate the three data files with the full backend track content (5 lessons, 1 ticket, 1 track). Implement `useProgress` hook with localStorage read/write.

**Depends on**: Phase 1
**Research**: Unlikely
**Traces to**: PRD §4 Data Model, PRD §4 localStorage Keys, US-010, US-011, US-012, US-013

**Deliverables**:
- `types/index.ts` — Track, Lesson, Resource, Ticket interfaces
- `data/tracks.ts` — backend track definition
- `data/lessons.ts` — all 5 backend lessons with real content (skills, resources, checkpoint)
- `data/tickets.ts` — to-do REST API ticket
- `hooks/useProgress.ts` — reads/writes `completedLessons`, `unlockedLessons`, `completedTickets`; Stage 1 seeded; completing lesson N unlocks N+1; graceful on missing localStorage

---

### Phase 3: Homepage & Tracks

**Goal**: Build the three "browse" screens: homepage hero + track cards, all-tracks page, and track detail page with lesson list and progress bar.

**Depends on**: Phase 1, Phase 2
**Research**: Unlikely
**Traces to**: PRD §5 Screens, US-001, US-002, US-003, US-004

**Deliverables**:
- `app/page.tsx` — hero (headline, description, CTA → /tracks) + TrackCard grid
- `app/tracks/page.tsx` — all tracks from `data/tracks.ts`
- `app/tracks/[trackId]/page.tsx` — lesson list with ProgressBar + LessonCard per lesson (completion state from `useProgress`)
- `components/TrackCard.tsx`
- `components/LessonCard.tsx` — shows completion state, muted style when not yet unlocked
- `components/ProgressBar.tsx`
- All screens responsive at 375px

---

### Phase 4: Lesson & Ticket Pages

**Goal**: Build the core learning experience — the lesson detail page (content, resources, checkpoint, mark complete) and the ticket detail page (context, requirements, stretch goals, DoD, mark complete).

**Depends on**: Phase 1, Phase 2
**Research**: Unlikely
**Traces to**: PRD §5 Screens, US-005, US-006, US-007, US-008, US-009

**Deliverables**:
- `app/lessons/[id]/page.tsx` — full lesson view with sidebar nav, ResourceLink list, checkpoint block, MarkComplete button
- `app/tickets/[id]/page.tsx` — ticket view with context, requirements[], stretchGoals[], DoD, difficulty badge, MarkComplete button
- `components/ResourceLink.tsx` — external link with type badge (video / reading / interactive)
- `components/TicketCard.tsx` (used on track page to list tickets)
- Mark complete updates localStorage and re-renders button state without page reload
- All screens responsive at 375px

---

### Phase 5: Polish & Verification

**Goal**: End-to-end validation that the full learner journey works, design is consistent, mobile is solid, and the build is clean.

**Depends on**: Phases 1–4
**Research**: None
**Traces to**: PRD §6 Non-Functional, PRD §8 Success Metrics

**Deliverables**:
- Full learner journey verified: load → browse → read lesson → mark complete → unlock next → read ticket → mark complete
- Content authoring test: add dummy lesson to `data/lessons.ts`, verify it renders, remove it
- Mobile audit at 375px across all 5 screens
- `npm run build` passes with zero TypeScript errors and zero ESLint warnings
- Semantic HTML + keyboard navigation spot check
- README updated with run instructions
