# Plan 01-02 Summary: Global layout shell and Nav component

## Status: COMPLETE

## What was done

1. **types/index.ts** — Created all 4 TypeScript interfaces: `Resource`, `Lesson`, `Track`, `Ticket`. `isLocked` is NOT in the Lesson interface (derived at runtime from localStorage).

2. **components/Nav.tsx** — `'use client'` component with wordmark link to `/` and Tracks link to `/tracks`. Active state uses `text-accent` when `pathname.startsWith('/tracks')`, otherwise `text-muted hover:text-primary`. All custom Tailwind tokens used throughout.

3. **app/layout.tsx** — Updated to import and render `<Nav />` above `<main>{children}</main>`. Body uses `GeistSans.className bg-base text-primary min-h-screen`.

4. **app/globals.css** — Added `.page-container` utility via `@layer components`: `mx-auto max-w-5xl px-4 sm:px-6 py-10`.

5. **app/tracks/page.tsx** — Stub page created (required for build to pass with Nav linking to /tracks).

## Verification

- [x] types/index.ts exists with all 4 interfaces
- [x] components/Nav.tsx renders wordmark and Tracks link
- [x] Nav active state uses accent colour on /tracks/*
- [x] app/layout.tsx wires Nav into every page
- [x] .page-container utility defined in globals.css
- [x] npx tsc --noEmit passes (0 errors)
- [x] npm run build passes (5/5 static pages)

## Notes

- Used `GeistSans` from `geist/font/sans` (consistent with Plan 01-01 setup)
- Build output: 3 static routes — `/`, `/_not-found`, `/tracks`
