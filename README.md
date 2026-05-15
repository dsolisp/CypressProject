# Cypress QA Automation POC

This repository is a **portfolio-grade Cypress automation framework** focused on **maintainable patterns**, **CI parity**, and **observable test runs**.

## Why this POC exists

This repo demonstrates how to build a Cypress-based framework that’s more than “just UI tests”:

- **Architecture discipline** (POM + locator rules via ADRs)
- **Multi-layer automation** (UI + API + accessibility + visual + DB-backed checks)
- **Hermetic-by-default execution** (isolated SQLite per run)
- **Observability hooks** (OpenTelemetry trace id surfaced per run)
- **CI-ready reporting** (Allure artifacts + consistent workflows across the portfolio)

## What’s implemented (source of truth: `package.json` + `cypress.config.ts`)

- **Framework**: Cypress (TypeScript)
- **Reporting**: Allure (`allure-cypress`)
- **Visual regression**: `cypress-image-diff-js` (committed baselines)
- **Accessibility**: `cypress-axe` / `axe-core`
- **DB integration**: SQLite (`sqlite3`) with seeding + query tasks
- **Observability**: OpenTelemetry (`@opentelemetry/*`) wired from `cypress.config.ts`

## Applications under test (evidence: `cypress.config.ts`, `cypress/support/constants.ts`)

| Target                       | Default URL                                                     | Where it is used                                                                    |
| ---------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **SauceDemo** (primary UI)   | `https://www.saucedemo.com`                                     | `e2e.baseUrl` in `cypress.config.ts`; most UI specs under `cypress/ui/`             |
| **Practice app** (UI drills) | `http://localhost:8080`                                         | `env.practiceBaseUrl` (`PRACTICE_BASE_URL`); practice specs under `cypress/ui/`     |
| **Public APIs**              | `https://jsonplaceholder.typicode.com`, `https://swapi.dev/api` | Constants in `cypress/support/constants.ts`; backend specs under `cypress/backend/` |

This portfolio does **not** treat search engines (Google, Bing, etc.) as applications under test.

## CI scope (default branch: `.github/workflows/ci.yml`)

On `push` / `pull_request` to `main`, CI runs **quality + unit tests only** (`pnpm run lint`, `pnpm run format:check`, `pnpm run typecheck`, audits, `pnpm run test:unit`). It does **not** run headed Cypress UI by default. For full browser suites, run `pnpm run cy:run` locally or use `.github/workflows/full-tests.yml` (workflow dispatch).

## Quick start

### Prereqs

- Node.js **24+**
- pnpm via Corepack

### Install

```bash
corepack enable
pnpm install
```

### Seed DB (used by DB tests / local dev)

```bash
node scripts/seed_db.js
```

### Run

```bash
pnpm run cy:open
pnpm run cy:run
```

## Where the implementation lives (read the code)

- **Cypress runtime wiring**: `cypress.config.ts` (SQLite tasks, OpenTelemetry `before:run` / `after:run`, image-diff plugin)
- **OTel helpers**: `scripts/otel.ts` (imported from `cypress.config.ts`)
- **UI + backend specs**: `cypress/ui/`, `cypress/backend/`, `cypress/accessibility/`, `cypress/performance/`
- **POM + locators**: `cypress/pages/`, `cypress/locators/`
- **Shared support**: `cypress/support/`

### Lighthouse-style vs Google Lighthouse CLI

**Lighthouse-style** in this repo means **Axe** checks plus **RUM-style** performance using the browser **Performance API** and wall-clock assertions in Cypress — not the same as wiring **Google Lighthouse CLI** on every PR (optional spike only; see [`.github/workflows/cypress-lighthouse-optional.yml`](.github/workflows/cypress-lighthouse-optional.yml) and `docs/OPTIONAL_LIGHTHOUSE.md`). [`CYPRESS_MASTERCLASS.md`](CYPRESS_MASTERCLASS.md) may mention `cypress-audit` as a tutorial path; default CI does not depend on it.

| Area                                        | Spec                                                                                                                                                                         |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accessibility (incl. Lighthouse-named flow) | [`cypress/accessibility/lighthouse.cy.ts`](cypress/accessibility/lighthouse.cy.ts), [`cypress/accessibility/accessibility.cy.ts`](cypress/accessibility/accessibility.cy.ts) |
| Performance (RUM-style)                     | [`cypress/performance/performance.cy.ts`](cypress/performance/performance.cy.ts)                                                                                             |

## Documentation

- **Start here**: `docs/ZERO_TO_HERO.md` (tutorial-style: setup → run → extend → troubleshoot)
- **Visual regression**: `docs/visual-testing-guide.md`
- **Architecture rules**: `docs/adr/` (start with `ADR-007-test-parity-policy.md`)
- **OTel test-run attributes** (portfolio monorepo): [`../shared-docs/docs/OTEL_TEST_RUN_ATTRIBUTES.md`](../shared-docs/docs/OTEL_TEST_RUN_ATTRIBUTES.md)
