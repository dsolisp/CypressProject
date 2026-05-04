/**
 * DropdownLocators — selectors for /dropdown.html (ADV-E1, ADV-E2).
 * Pure selector definitions only — zero logic, zero assertions (Law 1 & Law 2).
 */
export const DropdownLocators = {
  backHome:        '[data-test="back-home"]',
  staticDropdown:  '[data-test="static-dropdown"]',
  staticStatus:    '[data-test="static-status"]',
  dynamicDropdown: '[data-test="dynamic-dropdown"]',
  dynamicStatus:   '[data-test="dynamic-status"]',
} as const;
