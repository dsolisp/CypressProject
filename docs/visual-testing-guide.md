## Visual Testing (CypressProject)

This repo’s visual regression testing is implemented with `cypress-image-diff-js`.

## What’s committed vs generated

- **Committed baselines**: `cypress-image-diff-screenshots/baseline/`
- **Generated outputs (ignored)**:
  - `cypress-image-diff-screenshots/actual/`
  - `cypress-image-diff-screenshots/diff/`

## Local workflow

1. Install dependencies:

```bash
corepack enable
pnpm install
```

2. Run the visual tests (headless):

```bash
pnpm run cy:run
```

## Updating baselines

Baseline updates should be intentional (PR-reviewed). Use the existing visual testing configuration and update mechanism defined in the Cypress specs/support code for this repo.

If you add a new visual test, ensure its baseline is created and committed under `cypress-image-diff-screenshots/baseline/`.

## Troubleshooting

- **Baselines not found**: confirm the baseline folder is tracked and not ignored.
- **False diffs**: ensure deterministic viewport, stable fonts, and stable data/state before snapshot.
