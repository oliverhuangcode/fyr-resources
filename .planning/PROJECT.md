# Project: MAC Learn

## Vision

A self-paced, content-first learning platform for MAC members to build practical backend skills. The curriculum lives entirely in data files — adding a lesson or ticket requires no component changes. Progress is tracked in localStorage with no backend dependency.

---

## Requirements

### Validated (MVP)

- Full backend track: 5 lessons + 1 starter ticket
- All 5 screens: `/`, `/tracks`, `/tracks/[trackId]`, `/lessons/[id]`, `/tickets/[id]`
- "Mark complete" button on lessons and tickets (localStorage persistence)
- Stage 1 seeded as unlocked by default; completing lesson N unlocks lesson N+1
- All lesson content always readable (no hard content gate)
- Tailwind custom theme tokens (no hardcoded hex values in components)
- Geist font, dark-only, responsive (375px minimum)
- `npm run build` produces a static-exportable artifact

### Active (Under Discussion)

- Progress bar on `/tracks/[trackId]` — lessons only (tickets shown separately)
- Locked lessons shown with muted card style, no lock icon
- Nav: wordmark + Tracks link only (no global progress counter in MVP)

### Out of Scope

- Multiple tracks beyond the backend track
- Progress reset button
- Lesson search / filtering
- Admin/authoring UI
- Analytics, auth, server-side persistence
- Light mode / dark-mode toggle

---

## Constraints

- No database, no auth, no external APIs
- No shadcn, no UI component libraries — built from scratch with Tailwind
- No inline styles, no CSS modules — Tailwind utility classes only
- No white or light backgrounds anywhere
- Static deployable (Vercel or GitHub Pages via `next export`)
- Mobile responsive required (MVP, not post-MVP)

---

## Key Decisions

| Decision | Status | Rationale |
|----------|--------|-----------|
| Next.js 14 App Router | Approved | Static export, file-based routing, no server needed |
| localStorage for progress | Approved | Zero backend; works offline; sufficient for MAC's use case |
| Data files as CMS | Approved | Zero tooling overhead; any MAC member can add content via PR |
| No content gating | Approved | Learners can always read ahead; only completion state is tracked |
| Tailwind custom theme | Approved | Enforces design system without a component library |
| `isLocked` derived at runtime | Approved | Not stored in data — computed from `unlockedLessons` in localStorage |
| Ticket always accessible | Approved | Learners attempt when ready; no completion gate |
