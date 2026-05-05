/**
 * dependency-cruiser config — Gold Standard layer guard for Cypress.
 * Enforces: tests > pages|support > locators|utils
 *
 * ADR-012 (Tooling): dependency-cruiser for TypeScript layer isolation.
 */

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    // ── Law 1 / Layering: locators must not import from pages ────────
    {
      name: 'no-locators-importing-pages',
      severity: 'error',
      comment:
        'Locators are pure selector definitions — they must not depend on pages.',
      from: { path: '^cypress/locators/' },
      to: { path: '^cypress/pages/' },
    },

    // ── Law 4 / Layering: pages must not import from tests ──────────
    {
      name: 'no-pages-importing-tests',
      severity: 'error',
      comment: 'Page objects must not depend on test/spec files.',
      from: { path: '^cypress/pages/' },
      to: { path: '^cypress/e2e/' },
    },

    // ── Law 3 / Layering: locators must not import from tests ───────
    {
      name: 'no-locators-importing-tests',
      severity: 'error',
      comment: 'Locators must not depend on test files.',
      from: { path: '^cypress/locators/' },
      to: { path: '^cypress/e2e/' },
    },

    // ── Circular dependencies are always forbidden ───────────────────
    {
      name: 'no-circular',
      severity: 'error',
      comment: 'Circular imports create unpredictable test behaviour.',
      from: {},
      to: { circular: true },
    },
  ],

  options: {
    doNotFollow: {
      path: 'node_modules',
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.json',
    },
    reporterOptions: {
      text: {
        highlightFocused: true,
      },
    },
  },
};
