# Conventions

## Styling

- Tailwind utility classes only. No inline styles. No CSS modules.
- All colours via custom Tailwind theme tokens — never hardcode hex values in components.
- Custom tokens: `bg-base`, `bg-surface`, `accent`, `text-primary`, `text-muted`, `border-subtle`
- No white or light backgrounds anywhere (`bg-white`, `bg-gray-*` are banned).
- No gradients. No box shadows. No component libraries (no shadcn, no radix, no headless UI).

## Tailwind Token Map

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-base` | #1C1C1C | Page background |
| `bg-surface` | #242424 | Cards, modals, panels |
| `accent` | #F5C518 | CTA buttons, active states, highlights |
| `text-primary` | #FFFFFF | Body text, headings |
| `text-muted` | #888888 | Secondary text, labels, metadata |
| `border-subtle` | #2E2E2E | Card borders, dividers |

## Components

- Components in `components/` are pure renderers — they accept props, render UI, no data fetching.
- Client components (those using `useProgress` or `useState`) have `'use client'` at the top.
- No default exports for components — named exports only.

## Data Files

- `data/tracks.ts`, `data/lessons.ts`, `data/tickets.ts` export typed arrays.
- IDs are kebab-case strings (e.g., `'js-variables'`, `'todo-api'`).
- Stage numbers are 1-indexed integers.
- `isLocked` is NOT stored in data — it is derived at runtime from `useProgress`.

## TypeScript

- Strict mode enabled.
- All types in `types/index.ts`.
- No `any`. No `// @ts-ignore`.

## File Naming

- Pages: `app/**/page.tsx`
- Components: `components/ComponentName.tsx` (PascalCase)
- Hooks: `hooks/useSomething.ts` (camelCase with `use` prefix)
- Data files: `data/pluralNoun.ts`
