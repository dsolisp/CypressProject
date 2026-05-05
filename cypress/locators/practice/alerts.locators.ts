/**
 * AlertsLocators — selectors for /alerts.html (ADV-E7, ADV-E8, ADV-E9).
 * Pure selector definitions only — zero logic, zero assertions (Law 1 & Law 2).
 */
export const AlertsLocators = {
  backHome: '[data-test="back-home"]',
  triggerAlert: '[data-test="trigger-alert"]',
  triggerConfirm: '[data-test="trigger-confirm"]',
  triggerPrompt: '[data-test="trigger-prompt"]',
  result: '[data-test="result"]',
  resultText: '[data-test="result-text"]',
} as const;
