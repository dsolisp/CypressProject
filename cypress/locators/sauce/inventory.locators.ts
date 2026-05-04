/**
 * InventoryLocators — all selectors for the SauceDemo inventory page.
 * Pure selector definitions only — zero logic, zero assertions (Law 1 & Law 2).
 */
export const InventoryLocators = {
  inventoryList:     '.inventory_list',
  inventoryItem:     '.inventory_item',
  itemName:          '.inventory_item_name',
  itemPrice:         '.inventory_item_price',
  cartBadge:         '[data-test="shopping-cart-badge"]',
  cartLink:          '.shopping_cart_link',
  sortDropdown:      '[data-test="product-sort-container"]',
  addToCartBackpack: '[data-test="add-to-cart-sauce-labs-backpack"]',
  addToCartBikeLight:'[data-test="add-to-cart-sauce-labs-bike-light"]',
} as const;
