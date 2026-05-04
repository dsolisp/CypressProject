import BasePage from '../BasePage';
import { SelectorsLocators } from '../../locators/practice/selectors.locators';

/**
 * SelectorsPage — Gold Standard POM for /selectors.html.
 * Demonstrates all 10 selector strategy sections.
 * Extends BasePage (1 level, Law 4). Zero assertions inside (Law 2).
 * All selectors live in SelectorsLocators (Law 1).
 */
export class SelectorsPage extends BasePage {
  constructor() {
    super();
    this.baseUrl = Cypress.env('practiceBaseUrl') as string;
  }

  // ── Navigation ──────────────────────────────────────────────────────
  openSelectorsPage() {
    return this.open('/selectors.html');
  }

  // ── Section 1: id & name ────────────────────────────────────────────
  getUsernameInput() { return cy.get(SelectorsLocators.inputUsername); }
  getPasswordInput() { return cy.get(SelectorsLocators.inputPassword); }

  // ── Section 2: CSS class & attribute ────────────────────────────────
  getPrimaryButton()   { return cy.get(SelectorsLocators.btnPrimary); }
  getSecondaryButton() { return cy.get(SelectorsLocators.btnSecondary); }
  getSuccessBadge()    { return cy.get(SelectorsLocators.badgeSuccess); }
  getWarningBadge()    { return cy.get(SelectorsLocators.badgeWarning); }
  getErrorBadge()      { return cy.get(SelectorsLocators.badgeError); }

  // ── Section 3: link text ────────────────────────────────────────────
  getExactLink()   { return cy.get(SelectorsLocators.linkExact); }
  getPartialLink() { return cy.get(SelectorsLocators.linkPartial); }
  getAriaLink()    { return cy.get(SelectorsLocators.linkAria); }

  // ── Section 4: ARIA ─────────────────────────────────────────────────
  getEmailInput()    { return cy.get(SelectorsLocators.inputEmail); }
  getLiveRegion()    { return cy.get(SelectorsLocators.liveRegion); }
  triggerLiveRegion() {
    cy.get(SelectorsLocators.btnTriggerLive).click();
    return this;
  }

  // ── Section 5: form attributes ──────────────────────────────────────
  getDisabledInput() { return cy.get(SelectorsLocators.inputDisabled); }
  getCheckboxAgree() { return cy.get(SelectorsLocators.checkboxAgree); }
  getRadioBasic()    { return cy.get(SelectorsLocators.radioBasic); }
  getRadioPro()      { return cy.get(SelectorsLocators.radioPro); }
  selectCountry(value: string) {
    cy.get(SelectorsLocators.selectCountry).select(value);
    return this;
  }

  // ── Section 6: data attributes ──────────────────────────────────────
  getProductList()       { return cy.get(SelectorsLocators.productList); }
  getProductItems()      { return cy.get(SelectorsLocators.productItem); }
  getElectronicsItems()  { return cy.get(SelectorsLocators.productElectronics); }

  // ── Section 7: image ────────────────────────────────────────────────
  getLogo() { return cy.get(SelectorsLocators.imgLogo); }

  // ── Section 8: title attribute ──────────────────────────────────────
  getSaveButton()   { return cy.get(SelectorsLocators.btnSave); }
  getDeleteButton() { return cy.get(SelectorsLocators.btnDelete); }
  getAbbrQA()       { return cy.get(SelectorsLocators.abbrQA); }

  // ── Section 9: table ────────────────────────────────────────────────
  getTable()     { return cy.get(SelectorsLocators.dataTable); }
  getTableRows() { return cy.get(SelectorsLocators.tableRow); }
  getTableRowNameCell(rowId: number | string) {
    return cy.get(SelectorsLocators.tableRowNameCell(rowId));
  }

  // ── Section 10: XPath targets ───────────────────────────────────────
  getFruitList()    { return cy.get(SelectorsLocators.fruitList); }
  getFruitItems()   { return cy.get(SelectorsLocators.fruitItem); }
  getXpathText()    { return cy.get(SelectorsLocators.xpathText); }
  getXpathPartial() { return cy.get(SelectorsLocators.xpathPartial); }
}

export default new SelectorsPage();
