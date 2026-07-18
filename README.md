# Stone.js — Lab

**Living proof that Stone.js works.** This repository is a growing collection of **real,
runnable projects** that exercise every Stone.js feature in real-world scenarios. Anyone can
clone it, run an app locally, and see it work. It grows as the framework grows — each new
capability lands here as a runnable case.

> This is **not** a starters repo (those are minimal scaffolds to start *your* project) and it
> is **not** a junk drawer. It is the validation suite you can *see and run*.

## Apps

Each app lives under `apps/<name>` and is a self-contained Stone.js project (`npm install && npm run dev`).

### The REST API, four ways — 1:1 proof that Stone.js is TS **and** JS, declarative **and** imperative

The same task REST API is provided in all four corners of the paradigm × language matrix. The
domain logic (`TaskService`) is identical; only the wiring differs. The JavaScript variants are
**derived** from the TypeScript ones (`stone init --typing vanilla`): types are stripped while
stage-3 decorators are preserved — no second set of sources to maintain.

| App | Paradigm | Language | Status |
|---|---|---|---|
| `apps/rest-api` | Declarative (decorators) | TypeScript | ✅ builds, runs, unit + integration tests |
| `apps/rest-api-vanilla` | Declarative (decorators) | JavaScript | ✅ builds & runs (derived) |
| `apps/rest-api-imperative` | Imperative (`define*`) | TypeScript | ✅ builds & runs |
| `apps/rest-api-imperative-vanilla` | Imperative (`define*`) | JavaScript | ✅ builds & runs (derived) |

All four expose the exact same endpoints: `GET /tasks`, `GET /tasks/:id(\d+)`, `POST /tasks`,
`POST /tasks/:id/toggle`, `DELETE /tasks/:id`.

### The React app, three ways — one codebase, three rendering strategies

The same two pages (`HomePage`, `AboutPage`) and the same `WelcomeService` are rendered three
ways. Only the adapters and the pinned `rendering` in `stone.config.mjs` differ — proof that
Stone.js lets you "build once, render anywhere".

Each strategy also comes in **declarative** (decorators) and **imperative** (`define*`) form —
same pages, same service, only the wiring differs.

| Strategy | Declarative | Imperative | Proves |
|---|---|---|---|
| SPA (CSR) | `apps/spa` ✅ | `apps/spa-imperative` ✅ | multi-page routing, `StoneLink`, client-side rendering |
| SSR | `apps/ssr` ✅ | `apps/ssr-imperative` ✅ | server-rendered HTML + client hydration (isomorphic) |
| SSG | `apps/ssg` ✅ | `apps/ssg-imperative` ✅ | routes pre-rendered to static HTML + hydration |

All six build with `stone build`; the SSR/SSG outputs are verified to contain real rendered markup.

### Coming next

| App | Proves | Status |
|---|---|---|
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
