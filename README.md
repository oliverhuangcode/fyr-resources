# MAC Learn

A self-paced backend development curriculum for Monash Association of Coding members. Modelled on The Odin Project: structured tracks, ordered lessons, and hands-on tickets. Progress is stored in localStorage — no backend, no auth required.

## Prerequisites

- Node.js 18+
- npm 9+

## Getting started

```bash
npm install
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at http://localhost:3000 |
| `npm run build` | Production build — static export to `out/` |
| `npx tsc --noEmit` | Type-check only (no output files) |
| `npm run lint` | Run ESLint |

## Adding content

MAC Learn is content-first. No component changes are needed to add curriculum.

**Add a lesson** — append to `data/lessons.ts`:
```ts
{
  id: 'backend-06',           // unique ID, used in the URL
  trackId: 'backend',         // which track it belongs to
  stage: 6,                   // order within the track
  title: 'Your Lesson Title',
  duration: '30 min',
  description: 'What this lesson is about.',
  skills: ['Skill one', 'Skill two'],
  resources: [
    { title: 'Resource name', url: 'https://...', type: 'reading' },
  ],
  checkpoint: 'Self-check question for the learner.',
}
```
Then add the lesson ID to the `lessons` array in `data/tracks.ts`.

**Add a ticket** — append to `data/tickets.ts`:
```ts
{
  id: 'backend-ticket-02',
  trackId: 'backend',
  title: 'Ticket Title',
  context: 'Background for the learner.',
  requirements: ['Requirement one', 'Requirement two'],
  stretchGoals: ['Optional extra challenge'],
  definitionOfDone: 'What done looks like.',
  difficulty: 'starter',   // 'starter' | 'intermediate' | 'advanced'
}
```
Then add the ticket ID to the `tickets` array in `data/tracks.ts`.

**Add a track** — append to `data/tracks.ts`:
```ts
{
  id: 'frontend',
  title: 'Frontend Development',
  description: 'Learn HTML, CSS, and JavaScript.',
  icon: '🖥️',
  lessons: [],   // populate after adding lessons
  tickets: [],
}
```

## Stack

- [Next.js 14](https://nextjs.org) — App Router, static export
- TypeScript (strict mode)
- Tailwind CSS with custom design tokens
- Geist font
- localStorage for progress persistence (no backend)
