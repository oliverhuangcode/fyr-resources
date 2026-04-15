# Ralph Agent Configuration — MAC Learn

## Build Instructions

```bash
npm run build
```

## Test Instructions

```bash
npx tsc --noEmit && npm run lint
```

## Run Instructions

```bash
npm run dev
```

## Notes
- Static export — `npm run build` outputs to `out/`
- TypeScript strict mode — `npx tsc --noEmit` must pass before committing
- No test suite yet — type check + lint is the verification gate
- Do NOT run `npm run dev` in the loop (it blocks). Use `npm run build` to verify.
