import BasePage from '../BasePage';
import { CartLocators } from '../../locators/sauce/cart.locators';

/**
 * CartPage — Gold Standard.
 * Extends BasePage (1 level, Law 4). Zero assertions inside (Law 2).
 * All selectors live in CartLocators (Law 1).
 */
export class CartPage extends BasePage {
  // ── Actions ───────────────────────────────────────────────────────

  checkout() {
    cy.get(CartLocators.checkoutButton).click();
    return this;
  }

  continueShopping() {
    cy.get(CartLocators.continueShoppingButton).click();
    return this;
  }

  removeItemByIndex(index: number) {
    cy.get(CartLocators.removeButton).eq(index).click();
    return this;
  }

  // ── Getters — return Chainables; tests do the asserting (Law 2) ───

  getCartItems() {
    return cy.get(CartLocators.cartItem);
  }

  getItemNames() {
    return cy.get(CartLocators.itemName);
  }

  getCartBadge() {
    return cy.get(CartLocators.cartBadge);
  }
}

export default new CartPage();
