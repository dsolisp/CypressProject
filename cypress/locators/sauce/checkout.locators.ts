/**
 * CheckoutLocators — all selectors for the SauceDemo checkout flow.
 * Pure selector definitions only — zero logic, zero assertions (Law 1 & Law 2).
 */
export const CheckoutLocators = {
  firstNameInput:  '[data-test="firstName"]',
  lastNameInput:   '[data-test="lastName"]',
  postalCodeInput: '[data-test="postalCode"]',
  continueButton:  '[data-test="continue"]',
  finishButton:    '[data-test="finish"]',
  completeHeader:  '[data-test="complete-header"]',
  totalLabel:      '.summary_total_label',
  errorMessage:    '[data-test="error"]',
} as const;
