# Stone.js — Lab

**Living proof that Stone.js works.** This repository is a growing collection of **real,
runnable projects** that exercise every Stone.js feature in real-world scenarios. Anyone can
clone it, run an app locally, and see it work. It grows as the framework grows — each new
capability lands here as a runnable case.

> This is **not** a starters repo (those are minimal scaffolds to start *your* project) and it
> is **not** a junk drawer. It is the validation suite you can *see and run*.

## Apps

Each app lives under `apps/<name>` and is a self-contained Stone.js project (`npm install && npm run dev`).

| App | Proves | Status |
|---|---|---|
| `apps/rest-api` | HTTP API: routing, middleware, validation, error handling, DoS guards | planned |
| `apps/spa` | Browser SPA: client routing, `StoneLink`, hooks, View Transitions, scroll restoration | planned |
| `apps/ssr` | Server-side rendering with hydration (React + use-view) | planned |
| `apps/ssg` | Static site generation | planned |
| `apps/security-dashboard` | Live dashboard of security & runtime metrics via `@stone-js/telemetry` | planned |

Each app is added incrementally and validated by running it — see the checklist in each app's README.

## Running an app

```bash
cd apps/<name>
npm install
npm run dev      # start locally
npm run build    # production build
npm test         # its validation tests
```

## Also a starter provider

The lab doubles as a **starter provider**: its `package.json` declares `stone.starters`, so you
can scaffold any of these apps as a starting point:

```bash
stone init my-app --starters github:stone-foundation/stone-js-lab
```

(The official minimal starters remain the default via `github:stone-foundation/stone-js-starters`.)

## License

[MIT](../LICENSE) © Stone Foundation.
