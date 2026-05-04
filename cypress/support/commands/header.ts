import { HeaderLocators } from '../../locators/components/header.locators';

/**
 * Header custom commands — Cypress-native equivalent of HeaderComponent (ADR-005).
 * Composed via cy.* calls in specs; never inherited.
 * Zero assertions inside — callers assert on results (Law 2).
 */

declare global {
  namespace Cypress {
    interface Chainable {
      /** Click the shopping cart icon to navigate to the cart page. */
      headerGoToCart(): Chainable<void>;

      /** Open the burger navigation menu. */
      headerOpenMenu(): Chainable<void>;

      /** Close the burger navigation menu. */
      headerCloseMenu(): Chainable<void>;

      /** Log out via the burger menu. */
      headerLogout(): Chainable<void>;

      /** Navigate to "All Items" via the burger menu. */
      headerGoToAllItems(): Chainable<void>;

      /** Reset app state via the burger menu, then close it. */
      headerResetAppState(): Chainable<void>;

      /** Get the page title element. */
      headerGetPageTitle(): Chainable<JQuery<HTMLElement>>;

      /** Get the cart badge element. */
      headerGetCartBadge(): Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add('headerGoToCart', () => {
  cy.get(HeaderLocators.cartLink).click();
});

Cypress.Commands.add('headerOpenMenu', () => {
  cy.get(HeaderLocators.menuButton).click();
});

Cypress.Commands.add('headerCloseMenu', () => {
  cy.get(HeaderLocators.menuCloseButton).click();
});

Cypress.Commands.add('headerLogout', () => {
  cy.get(HeaderLocators.menuButton).click();
  cy.get(HeaderLocators.logoutLink).click();
});

Cypress.Commands.add('headerGoToAllItems', () => {
  cy.get(HeaderLocators.menuButton).click();
  cy.get(HeaderLocators.allItemsLink).click();
});

Cypress.Commands.add('headerResetAppState', () => {
  cy.get(HeaderLocators.menuButton).click();
  cy.get(HeaderLocators.resetAppLink).click();
  cy.get(HeaderLocators.menuCloseButton).click();
});

Cypress.Commands.add('headerGetPageTitle', () => {
  return cy.get(HeaderLocators.pageTitle);
});

Cypress.Commands.add('headerGetCartBadge', () => {
  return cy.get(HeaderLocators.cartBadge);
});

export {};
