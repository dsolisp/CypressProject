/**
 * CartLocators — all selectors for the SauceDemo cart page.
 * Pure selector definitions only — zero logic, zero assertions (Law 1 & Law 2).
 */
export const CartLocators = {
  cartItem: '.cart_item',
  itemName: '.inventory_item_name',
  cartBadge: '[data-test="shopping-cart-badge"]',
  checkoutButton: '[data-test="checkout"]',
  continueShoppingButton: '[data-test="continue-shopping"]',
  removeButton: '[data-test^="remove-"]',
} as const;
