/**
 * BasePage — shared navigation helpers for all Cypress Page Objects.
 * Inheritance capped at 1 level: MyPage extends BasePage (Law 4).
 * Contains zero assertions — pages return chainables; tests assert (Law 2).
 * Raw selectors live in the matching locators file only (Law 1).
 */
export default class BasePage {
  /**
   * Optional base URL override for pages that navigate outside the
   * Cypress-configured baseUrl (e.g. InteractionsPage → the-internet.herokuapp.com).
   */
  protected baseUrl?: string;

  /** Navigate to a path. Prepends baseUrl if set; otherwise uses Cypress baseUrl. */
  open(path = '/') {
    cy.visit(this.baseUrl ? `${this.baseUrl}${path}` : path);
    return this;
  }

  /** Navigate to an absolute URL. */
  goto(url: string) {
    cy.visit(url);
    return this;
  }
}