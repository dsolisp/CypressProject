import { defineConfig } from 'cypress';
import sqlite3 from 'sqlite3';
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/plugin';

const db = sqlite3.verbose();

export default defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
      on('task', {
        queryDb: (query: string) => {
          return new Promise((resolve, reject) => {
            const database = new db.Database('app.db');
            database.all(query, [], (err: Error | null, rows: any[]) => {
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
