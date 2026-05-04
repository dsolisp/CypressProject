import BasePage from '../BasePage';
import { InventoryLocators } from '../../locators/sauce/inventory.locators';

/**
 * InventoryPage — Gold Standard.
 * Extends BasePage (1 level, Law 4). Zero assertions inside (Law 2).
 * All selectors live in InventoryLocators (Law 1).
 */
export class InventoryPage extends BasePage {
  // ── Navigation ────────────────────────────────────────────────────

  openInventory() {
    return this.open('/inventory.html');
  }

  // ── Actions ───────────────────────────────────────────────────────

  addBackpackToCart() {
    cy.get(InventoryLocators.addToCartBackpack).click();
    return this;
  }

  addBikeLightToCart() {
    cy.get(InventoryLocators.addToCartBikeLight).click();
    return this;
  }

  goToCart() {
    cy.get(InventoryLocators.cartLink).click();
    return this;
  }

  sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
    cy.get(InventoryLocators.sortDropdown).select(value);
    return this;
  }

  // ── Getters — return Chainables; tests do the asserting (Law 2) ───

  getInventoryItems() {
    return cy.get(InventoryLocators.inventoryItem);
  }

  getItemNames() {
    return cy.get(InventoryLocators.itemName);
  }

  getItemPrices() {
    return cy.get(InventoryLocators.itemPrice);
  }

  getCartBadge() {
    return cy.get(InventoryLocators.cartBadge);
  }

  getInventoryList() {
    return cy.get(InventoryLocators.inventoryList);
  }
}

export default new InventoryPage();
