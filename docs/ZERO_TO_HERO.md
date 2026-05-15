## Zero-to-Hero: CypressProject (tutorial)

This tutorial walks you through recreating and understanding the CypressProject framework. Each chapter includes:

- **What & Why** (the intent and architecture)
- **Commands** (what to run)
- **Expected outcome** (what “done” looks like)

Everything in this guide is constrained to what this repo **currently implements** (Cypress + TypeScript, pnpm, Allure, visual baselines, SQLite tasks, accessibility, and OpenTelemetry wiring).

**Implementation-first reading:** `cypress.config.ts`, `cypress/support/`, `scripts/otel.ts`, `scripts/seed_db.js`, and the specs under `cypress/` — those files are the source of truth.

**Naming:** The canonical filename is **`docs/ZERO_TO_HERO.md`**. `docs/ZERO-TO-HERO.md` is a legacy stub that points here (portfolio-wide underscore convention).

---

## Table of Contents

- [1. Project initialization (pnpm + scripts)](#1-project-initialization-pnpm--scripts)
- [2. Quality gates (lint/format/typecheck)](#2-quality-gates-lintformattypecheck)
- [3. Repo structure and architecture rules](#3-repo-structure-and-architecture-rules)
- [4. UI automation (SauceDemo) with POM + locators](#4-ui-automation-saucedemo-with-pom--locators)
- [5. API checks (Cypress request layer)](#5-api-checks-cypress-request-layer)
- [6. Accessibility testing (axe)](#6-accessibility-testing-axe)
- [7. SQLite-backed testing (seed + query tasks)](#7-sqlite-backed-testing-seed--query-tasks)
- [8. Visual regression testing (baselines)](#8-visual-regression-testing-baselines)
- [9. Reporting (Allure)](#9-reporting-allure)
- [10. Observability (OpenTelemetry)](#10-observability-opentelemetry)
- [11. Troubleshooting](#11-troubleshooting)

---

## 1. Project initialization (pnpm + scripts)

### What & Why

This repo uses **pnpm** (pinned via `packageManager` in `package.json`) because it’s fast, deterministic, and CI-friendly. Scripts are the public API of the repo: they are what local dev and CI run.

### Commands

```bash
corepack enable
pnpm install
```

### Expected outcome

- Dependencies install successfully.
- `pnpm run cy:open` and `pnpm run cy:run` exist (from `package.json`).

---

## 2. Quality gates (lint/format/typecheck)

### What & Why

Automation frameworks degrade fast without gates. This repo keeps a clean baseline via:

- ESLint (correctness + architecture guardrails)
- Prettier (format consistency)
- TypeScript (prevent “it runs but is wrong”)

### Commands

```bash
pnpm run lint
pnpm run format:check
pnpm run typecheck
```

### Expected outcome

- All three commands pass locally before you open a PR.

---

## 3. Repo structure and architecture rules

### What & Why

The core rule is: **specs should encode intent**, not implementation details.

That means:

- Specs shouldn’t own selectors.
- Locators should be centralized and mirrored.
- Page objects should contain behavior (business actions), not assertions.

### Repository map

- `cypress/ui/`: UI specs (SauceDemo flows)
- `cypress/pages/`: page objects (behavior)
- `cypress/locators/`: locator definitions (selectors live here, not in specs)
- `cypress/support/`: custom commands + constants
- `cypress/accessibility/`: accessibility specs
- `cypress/backend/`: API/DB-oriented specs (where present)
- `scripts/`: utilities (DB seed, OpenTelemetry wiring)
- `cypress.config.ts`: node event wiring (OTel + DB tasks + visual plugin)

### Read first (architecture)

- `docs/adr/ADR-007-test-parity-policy.md`
- `docs/adr/ADR-003-no-selectors-in-specs.md`
- `docs/adr/ADR-001-locator-mirroring.md`

---

## 4. UI automation (SauceDemo) with POM + locators

### What & Why

This repo uses a POM-style structure so specs can read like:

- “login as standard user”
- “add item to cart”
- “checkout”

Instead of:

- “click `#user-name`”
- “type into `.btn_primary`”

### Exercises (extend the framework)

1. Add a new locator under `cypress/locators/` for a missing element.
2. Add a method to a page under `cypress/pages/` that uses that locator.
3. Write a spec under `cypress/ui/` that uses page behavior (no selectors).

### Commands

```bash
pnpm run cy:run:sauce
```

### Expected outcome

- The focused SauceDemo suite runs headless and passes.

---

## 5. API checks (Cypress request layer)

### What & Why

Cypress can validate backend behavior without spinning a browser using its request layer. The goal is:

- quick feedback
- deterministic checks
- reusable helpers (no copy/paste)

### Exercise

- Add one API spec that validates status + schema-like shape checks (without introducing new libraries).

---

## 6. Accessibility testing (axe)

### What & Why

This repo uses `cypress-axe` + `axe-core` to run WCAG checks as tests.

### Exercise

- Add an accessibility spec that runs `axe` against a stable page state.

---

## 7. SQLite-backed testing (seed + query tasks)

### What & Why

This repo demonstrates hybrid testing:

- seed realistic data
- drive assertions from DB state
- keep runs isolated

### Step 1: Seed locally

```bash
node scripts/seed_db.js
```

### Step 2: Understand the Cypress tasks

`cypress.config.ts` exposes tasks such as:

- `seedDb`
- `queryDb`

These are executed in the Node process and called by specs when they need DB interaction.

### Step 3: Hermetic-by-default DB

For parallel safety, the config generates a unique sqlite file per run and stores it in `config.env.DB_PATH`.

---

## 8. Visual regression testing (baselines)

### What & Why

Visual tests only work if baselines are:

- committed
- deterministic
- reviewed like code

### Where baselines live

- **Committed**: `cypress-image-diff-screenshots/baseline/`
- **Generated (ignored)**:
  - `cypress-image-diff-screenshots/actual/`
  - `cypress-image-diff-screenshots/diff/`

### How to work with visuals

See `docs/visual-testing-guide.md`.

---

## 9. Reporting (Allure)

### What & Why

Allure provides:

- a single report surface across test types
- attachments (screenshots, logs)
- consistency across the five-repo portfolio

This repo uses `allure-cypress`. CI uploads artifacts and publishes HTML using the shared portfolio flow.

---

## 10. Observability (OpenTelemetry)

### What & Why

This repo emits a run-level trace so you can correlate:

- a CI run
- an Allure report
- telemetry in an observability backend

### Where it’s implemented

In `cypress.config.ts`, the framework:

- starts a span on `before:run`
- ends it on `after:run`
- prints `[otel] trace_id=...`
- exposes `config.env.OTEL_TRACE_ID`

### Exercise

Run headless and confirm you see the trace id printed:

```bash
pnpm run cy:run
```

---

## 11. Troubleshooting

### Cypress won’t start / crashes in the IDE terminal (macOS)

This repo includes a root-level fix for Cursor’s integrated terminal environment:

- `.vscode/settings.json` uses `"terminal.integrated.inheritEnv": false`

### Visual diffs are noisy

- Fix viewport and fonts
- Stabilize data/state before snapshot
- Avoid animations

### DB tasks fail

- Ensure `sqlite3` native dependency installed for your platform
- Confirm `node scripts/seed_db.js` works outside Cypress first
