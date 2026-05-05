/// <reference types="cypress" />
import { LoginLocators } from '../locators/sauce/login.locators';

// ── Type augmentation ────────────────────────────────────────────────
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Log in as the standard SauceDemo user using cy.session() (ADR-009).
       * The session is cached across specs — login happens at most once per run.
       */
      loginAsStandardUser(): Chainable<void>;

      /**
       * Log in with arbitrary credentials using cy.session().
       */
      loginAs(username: string, password: string): Chainable<void>;

      /**
       * Custom command from cypress-image-diff-js to compare visual snapshots.
       */
      compareSnapshot(
        name: string,
        options?: {
          errorThreshold?: number;
          capture?: 'fullPage' | 'viewport' | 'runner';
          screenshotConfig?: Record<string, unknown>;
        }
      ): Chainable<void>;

      /**
       * Execute a SQL query against the SQLite database.
       */
      dbQuery(sql: string): Chainable<unknown[]>;
    }
  }
}

// ── Auth commands (ADR-009) ──────────────────────────────────────────

Cypress.Commands.add('loginAsStandardUser', () => {
  cy.loginAs('standard_user', 'secret_sauce');
});

Cypress.Commands.add('loginAs', (username: string, password: string) => {
  cy.session(
    username,
    () => {
      cy.visit('/');
      cy.get(LoginLocators.usernameInput).type(username);
      cy.get(LoginLocators.passwordInput).type(password);
      cy.get(LoginLocators.loginButton).click();
      cy.url().should('include', '/inventory.html');
    },
    { cacheAcrossSpecs: true }
  );
});

// ── Database command ─────────────────────────────────────────────────

Cypress.Commands.add('dbQuery', (sql: string) => {
  return cy.task('queryDb', sql);
});

export {};
