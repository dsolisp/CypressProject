/**
 * WindowsLocators — selectors for /windows.html and /windows/new.html (ADV-E5, ADV-E6).
 * Pure selector definitions only — zero logic, zero assertions (Law 1 & Law 2).
 */
export const WindowsLocators = {
  // ── /windows.html ─────────────────────────────────────────────────
  backHome:      '[data-test="back-home"]',
  openTabLink:   '[data-test="open-new-tab-link"]',
  openTabJs:     '[data-test="open-new-tab-js"]',

  // ── /windows/new.html ─────────────────────────────────────────────
  newWindowHeading: '[data-test="new-window-heading"]',
  newWindowBody:    '[data-test="new-window-body"]',
  closeWindow:      '[data-test="close-window"]',
} as const;
