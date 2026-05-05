/**
 * IframesLocators — selectors for /iframes.html, editor.html, and inner-form.html (ADV-E3, ADV-E4).
 * Pure selector definitions only — zero logic, zero assertions (Law 1 & Law 2).
 */
export const IframesLocators = {
  // ── /iframes.html ────────────────────────────────────────────────
  backHome: '[data-test="back-home"]',
  parentFrame: '[data-test="parent-frame"]',
  outerFrame: '[data-test="outer-frame"]',

  // ── /iframes/editor.html (inside parentFrame) ────────────────────
  editor: '[data-test="editor"]',

  // ── /iframes/outer-frame.html (inside outerFrame) ────────────────
  childFrame: '[data-test="child-frame"]',

  // ── /iframes/inner-form.html (inside childFrame) ─────────────────
  innerName: '[data-test="inner-name"]',
  innerEmail: '[data-test="inner-email"]',
  innerSubmit: '[data-test="inner-submit"]',
  innerResult: '[data-test="inner-result"]',
} as const;
