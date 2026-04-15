# Ralph Fix Plan

## High Priority
- [x] Review codebase and understand architecture
- [x] Scaffold Next.js 14 project (Plan 01-01)
- [ ] Build Nav component + global layout shell (Plan 01-02)
- [ ] Build data layer: types, tracks, lessons, tickets, useProgress hook (Phase 2)
- [ ] Build homepage, tracks pages, track detail (Phase 3)
- [ ] Build lesson and ticket detail pages (Phase 4)
- [ ] Polish & verification (Phase 5)

## Medium Priority
- [ ] Add test coverage
- [ ] Update documentation

## Low Priority
- [ ] Performance optimization
- [ ] Code cleanup and refactoring

## Completed
- [x] Project enabled for Ralph
- [x] Plan 01-01: Next.js 14 scaffold with Tailwind custom tokens, GeistSans font, static export, build passes

## Notes
- `next.config.ts` not supported in Next.js 14.2.x — use `next.config.mjs`
- Geist font not in Google Fonts for this version — use `geist` npm package, import as `GeistSans` from `geist/font/sans`
- Focus on MVP functionality first
- Ensure each feature is properly tested
- Update this file after each major milestone
