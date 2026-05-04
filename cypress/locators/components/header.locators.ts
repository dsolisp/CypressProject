/**
 * HeaderLocators — all selectors for the SauceDemo global header.
 * Pure selector definitions only — zero logic, zero assertions (Law 1 & Law 2).
 */
export const HeaderLocators = {
  cartLink:       '.shopping_cart_link',
  cartBadge:      '[data-test="shopping-cart-badge"]',
  menuButton:     '#react-burger-menu-btn',
  menuCloseButton:'#react-burger-cross-btn',
  allItemsLink:   '#inventory_sidebar_link',
  aboutLink:      '#about_sidebar_link',
  logoutLink:     '#logout_sidebar_link',
  resetAppLink:   '#reset_sidebar_link',
  pageTitle:      '[data-test="title"]',
} as const;
