# Optional Google Lighthouse (CLI) in Cypress

Default **PR CI** and the main `cypress.config.ts` use **Axe** plus **RUM-style** performance specs — not Google Lighthouse CLI. That matches the portfolio “Lighthouse-style” naming (methodology) vs **Lighthouse CLI** (the npm `lighthouse` run).

If you want **real Lighthouse scores** in CI occasionally:

1. **Workflow (recommended):** [`.github/workflows/cypress-lighthouse-optional.yml`](../.github/workflows/cypress-lighthouse-optional.yml) — runs on `workflow_dispatch` and a **weekly** schedule only (not on pull requests).
2. **Locally:** Chrome must be installed. Then:

   ```bash
   pnpm run cy:lighthouse:optional
   ```

   This uses `cypress.config.lighthouse.cjs` and [`cypress/optional/lighthouse-cli.cy.ts`](../cypress/optional/lighthouse-cli.cy.ts).

3. **Tutorial drift:** [`CYPRESS_MASTERCLASS.md`](../CYPRESS_MASTERCLASS.md) shows `cypress-audit`-style wiring for learning; the **optional** path above uses **`@cypress-audit/lighthouse`** (current package name) in an isolated config so the main runner stays unchanged.

**Caveats:** Lighthouse runs a second Chrome profile, adds CI time, and scores on third-party sites (e.g. SauceDemo) can fluctuate. Keep this **optional / low frequency**, not a merge gate.
