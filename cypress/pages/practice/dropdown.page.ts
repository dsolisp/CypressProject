import BasePage from '../BasePage';
import { DropdownLocators } from '../../locators/practice/dropdown.locators';

/**
 * DropdownPage — Gold Standard POM for /dropdown.html (ADV-E1, ADV-E2).
 * Extends BasePage (1 level, Law 4). Zero assertions inside (Law 2).
 * All selectors live in DropdownLocators (Law 1).
 */
export class DropdownPage extends BasePage {
  constructor() {
    super();
    this.baseUrl = Cypress.env('practiceBaseUrl') as string;
  }

  // ── Navigation ──────────────────────────────────────────────────────
  openDropdownPage() {
    return this.open('/dropdown.html');
  }

  // ── Actions ─────────────────────────────────────────────────────────

  /** ADV-E1: Select a value from the static dropdown. */
  selectStatic(value: string) {
    cy.get(DropdownLocators.staticDropdown).select(value);
    return this;
  }

  /** ADV-E2: Select a value from the dynamic dropdown. Spec must wait for enabled state first. */
  selectDynamic(value: string) {
    cy.get(DropdownLocators.dynamicDropdown).select(value);
    return this;
  }

  // ── Getters — return Chainables; tests do the asserting (Law 2) ─────

  getStaticDropdown() {
    return cy.get(DropdownLocators.staticDropdown);
  }

  getStaticStatus() {
    return cy.get(DropdownLocators.staticStatus);
  }

  getDynamicDropdown() {
    return cy.get(DropdownLocators.dynamicDropdown);
  }

  getDynamicStatus() {
    return cy.get(DropdownLocators.dynamicStatus);
  }
}

export default new DropdownPage();
