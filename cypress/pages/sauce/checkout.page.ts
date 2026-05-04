import BasePage from '../BasePage';
import { CheckoutLocators } from '../../locators/sauce/checkout.locators';
import type { CheckoutInfo } from '../../utils/builders/checkout.builder';

/**
 * CheckoutPage — Gold Standard.
 * Extends BasePage (1 level, Law 4). Zero assertions inside (Law 2).
 * All selectors live in CheckoutLocators (Law 1).
 */
export class CheckoutPage extends BasePage {
  // ── Actions ───────────────────────────────────────────────────────

  fillInformation(firstName: string, lastName: string, postalCode: string) {
    cy.get(CheckoutLocators.firstNameInput).type(firstName);
    cy.get(CheckoutLocators.lastNameInput).type(lastName);
    cy.get(CheckoutLocators.postalCodeInput).type(postalCode);
    return this;
  }

  fillWithInfo(info: CheckoutInfo) {
    return this.fillInformation(info.firstName, info.lastName, info.zipCode);
  }

  continue() {
    cy.get(CheckoutLocators.continueButton).click();
    return this;
  }

  finish() {
    cy.get(CheckoutLocators.finishButton).click();
    return this;
  }

  // ── Getters — return Chainables; tests do the asserting (Law 2) ───

  getCompleteHeader() {
    return cy.get(CheckoutLocators.completeHeader);
  }

  getTotal() {
    return cy.get(CheckoutLocators.totalLabel);
  }

  getErrorMessage() {
    return cy.get(CheckoutLocators.errorMessage);
  }
}

export default new CheckoutPage();
