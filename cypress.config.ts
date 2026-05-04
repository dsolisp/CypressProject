import { defineConfig } from 'cypress';
import sqlite3 from 'sqlite3';
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/plugin';
import { PATHS, TIMEOUTS } from './cypress/support/constants';

const db = sqlite3.verbose();

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    defaultCommandTimeout: TIMEOUTS.DEFAULT,
    pageLoadTimeout: TIMEOUTS.LONG,
    requestTimeout: TIMEOUTS.API,
    responseTimeout: TIMEOUTS.API,
    specPattern: 'cypress/**/*.cy.{ts,js}',
    supportFile: 'cypress/support/e2e.ts',

    // Practice app URL — overridable via PRACTICE_BASE_URL env var (ADR-010)
    env: {
      practiceBaseUrl: process.env.PRACTICE_BASE_URL ?? 'http://localhost:8080',
    },

    // Retry flaky tests: 2 times in CI, 0 locally
    retries: {
      runMode: 2,
      openMode: 0,
    },

    // cy.session() is GA in Cypress 12+ — no flag needed, but explicit for clarity
    testIsolation: true,

    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
      on('task', {
        queryDb: (query: string) => {
          return new Promise((resolve, reject) => {
            const database = new db.Database(PATHS.DB);
            database.all(query, [], (err: Error | null, rows: unknown[]) => {
              if (err) reject(err);
              resolve(rows);
            });
            database.close();
          });
        },
      });

      getCompareSnapshotsPlugin(on, config);
      return config;
    },
  },
});
