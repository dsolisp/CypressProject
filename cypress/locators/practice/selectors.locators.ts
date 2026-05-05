/**
 * SelectorsLocators — selectors for /selectors.html (all 10 selector strategy sections).
 * Pure selector definitions only — zero logic, zero assertions (Law 1 & Law 2).
 */
export const SelectorsLocators = {
  backHome: '[data-test="back-home"]',

  // ── 1 · id & name ─────────────────────────────────────────────────
  inputUsername: '[data-test="input-username"]',
  inputPassword: '[data-test="input-password"]',

  // ── 2 · CSS class & attribute ──────────────────────────────────────
  btnPrimary: '[data-test="btn-primary"]',
  btnSecondary: '[data-test="btn-secondary"]',
  badgeSuccess: '[data-test="badge-success"]',
  badgeWarning: '[data-test="badge-warning"]',
  badgeError: '[data-test="badge-error"]',

  // ── 3 · link text ──────────────────────────────────────────────────
  linkExact: '[data-test="link-exact"]',
  linkPartial: '[data-test="link-partial"]',
  linkAria: '[data-test="link-aria"]',

  // ── 4 · ARIA ───────────────────────────────────────────────────────
  inputEmail: '[data-test="input-email"]',
  btnClose: '[data-test="btn-close"]',
  liveRegion: '[data-test="live-region"]',
  btnTriggerLive: '[data-test="btn-trigger-live"]',

  // ── 5 · form attributes ────────────────────────────────────────────
  inputSearch: '[data-test="input-search"]',
  inputDisabled: '[data-test="input-disabled"]',
  selectCountry: '[data-test="select-country"]',
  checkboxAgree: '[data-test="checkbox-agree"]',
  radioBasic: '[data-test="radio-basic"]',
  radioPro: '[data-test="radio-pro"]',

  // ── 6 · data attributes ────────────────────────────────────────────
  productList: '[data-test="product-list"]',
  productItem: '[data-test="product-item"]',
  productElectronics: '[data-category="electronics"]',

  // ── 7 · image ──────────────────────────────────────────────────────
  imgLogo: '[data-test="img-logo"]',

  // ── 8 · title attribute ────────────────────────────────────────────
  btnSave: '[data-test="btn-save"]',
  btnDelete: '[data-test="btn-delete"]',
  btnExport: '[data-test="btn-export"]',
  abbrQA: '[data-test="abbr-qa"]',
  abbrCI: '[data-test="abbr-ci"]',
  abbrPOM: '[data-test="abbr-pom"]',

  // ── 9 · table ──────────────────────────────────────────────────────
  dataTable: '[data-test="data-table"]',
  tableRow: '[data-test="table-row"]',
  tableRowNameCell: (rowId: number | string) =>
    `[data-row-id="${rowId}"] [headers="col-name"]`,

  // ── 10 · XPath targets (reached via cy.contains or data-test) ──────
  fruitList: '[data-test="fruit-list"]',
  fruitItem: '[data-test="fruit-item"]',
  xpathText: '[data-test="xpath-text"]',
  xpathPartial: '[data-test="xpath-partial"]',
} as const;
