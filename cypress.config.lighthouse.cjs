/**
 * Optional Google Lighthouse (CLI-backed) via @cypress-audit/lighthouse.
 * Not used by default CI — run with `pnpm run cy:lighthouse:optional` or
 * `.github/workflows/cypress-lighthouse-optional.yml`.
 */
const { defineConfig } = require('cypress');
const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/optional/**/*.cy.ts',
    supportFile: 'cypress/support/lighthouse-optional.ts',
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (...args) => {
        const [, launchOptions] = args;
        prepareAudit(launchOptions);
      });
      on('task', {
        lighthouse: lighthouse(),
      });
      return config;
    },
  },
});
