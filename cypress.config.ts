import { defineConfig } from 'cypress';
import sqlite3 from 'sqlite3';
import path from 'path';
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/plugin';
import { TIMEOUTS } from './cypress/support/constants';
import { configureTracing, tracer } from './scripts/otel';
import { seed } from './scripts/seed_db.js';

const db = sqlite3.verbose();

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    defaultCommandTimeout: TIMEOUTS.DEFAULT,
    pageLoadTimeout: TIMEOUTS.LONG,
    requestTimeout: TIMEOUTS.API,
    responseTimeout: TIMEOUTS.API,
    specPattern: 'cypress/**/*.cy.{ts,js}',
    excludeSpecPattern: ['cypress/optional/**/*.cy.ts'],
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

    setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ) {
      configureTracing('CypressProject');
      const runTracer = tracer();
      let runSpan: ReturnType<typeof runTracer.startSpan> | null = null;

      on('before:run', (details: Cypress.BeforeRunDetails) => {
        runSpan = runTracer.startSpan('cypress.run', {
          attributes: {
            'cypress.browser': details.browser?.name ?? '',
            'test.browser': details.browser?.name ?? '',
            'cypress.specs': Array.isArray(details.specs)
              ? details.specs.length
              : 0,
            ...(process.env.GITHUB_SHA
              ? { 'git.sha': process.env.GITHUB_SHA }
              : {}),
            ...(process.env.OTEL_TEST_SUITE
              ? { 'test.suite': process.env.OTEL_TEST_SUITE }
              : {}),
          },
        });
        const ctx = runSpan.spanContext();
        if (ctx?.traceId) {
          // Surface trace id for linking in reports.
          console.log(`[otel] trace_id=${ctx.traceId}`);
          config.env.OTEL_TRACE_ID = ctx.traceId;
        }
      });

      on('after:run', () => {
        if (runSpan) runSpan.end();
        runSpan = null;
      });

      // Hermetic DB: generate a unique sqlite file per Cypress spec run and pass to tasks.
      // NOTE: This isolates across parallel CI nodes; per-test isolation can be layered later.
      const runDbPath =
        config.env.DB_PATH ??
        path.join(
          config.projectRoot,
          `test-results/db/${Date.now()}-${Math.random().toString(16).slice(2)}.db`
        );
      config.env.DB_PATH = runDbPath;

      on('task', {
        seedDb: async () => {
          const database = new db.Database(config.env.DB_PATH);
          try {
            await seed(database);
            return true;
          } finally {
            database.close();
          }
        },
        queryDb: (query: string) => {
          return new Promise((resolve, reject) => {
            const database = new db.Database(config.env.DB_PATH);
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
