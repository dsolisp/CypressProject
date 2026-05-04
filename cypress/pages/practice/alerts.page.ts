import BasePage from '../BasePage';
import { AlertsLocators } from '../../locators/practice/alerts.locators';

/**
 * AlertsPage — Gold Standard POM for /alerts.html (ADV-E7, ADV-E8, ADV-E9).
 * Extends BasePage (1 level, Law 4). Zero assertions inside (Law 2).
 * All selectors live in AlertsLocators (Law 1).
 *
 * Cypress auto-accepts alert() dialogs by default.
 * Use cy.on('window:confirm', ...) or cy.on('window:prompt', ...) in specs
 * before calling the action to control dialog behaviour.
 */
export class AlertsPage extends BasePage {
  constructor() {
    super();
    this.baseUrl = Cypress.env('practiceBaseUrl') as string;
  }

  // ── Navigation ──────────────────────────────────────────────────────
  openAlertsPage() {
    return this.open('/alerts.html');
  }

  // ── ADV-E7: Simple alert ─────────────────────────────────────────────
  triggerAlert() {
    cy.get(AlertsLocators.triggerAlert).click();
    return this;
  }

  // ── ADV-E8: Confirm dialog ───────────────────────────────────────────
  triggerConfirm() {
    cy.get(AlertsLocators.triggerConfirm).click();
    return this;
  }

  // ── ADV-E9: Prompt dialog ────────────────────────────────────────────
  triggerPrompt() {
    cy.get(AlertsLocators.triggerPrompt).click();
    return this;
  }

  // ── Getters — return Chainables; tests do the asserting (Law 2) ─────
  getResultText() {
    return cy.get(AlertsLocators.resultText);
  }
}

export default new AlertsPage();
