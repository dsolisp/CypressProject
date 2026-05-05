import BasePage from '../BasePage';
import { WindowsLocators } from '../../locators/practice/windows.locators';

/**
 * WindowsPage — Gold Standard POM for /windows.html (ADV-E5, ADV-E6).
 * Extends BasePage (1 level, Law 4). Zero assertions inside (Law 2).
 * All selectors live in WindowsLocators (Law 1).
 *
 * Cypress cannot switch to new browser tabs. The strategy here is:
 *   E5 — remove target="_blank" so the link navigates in the same tab.
 *   E6 — stub window.open and assert the stub was called.
 */
export class WindowsPage extends BasePage {
  constructor() {
    super();
    this.baseUrl = Cypress.env('practiceBaseUrl') as string;
  }

  // ── Navigation ──────────────────────────────────────────────────────
  openWindowsPage() {
    return this.open('/windows.html');
  }

  // ── ADV-E5: target="_blank" link ─────────────────────────────────────

  /**
   * Removes the target attribute from the link so Cypress can follow it
   * in the same tab, then clicks it.
   */
  openNewTabViaLink() {
    cy.get(WindowsLocators.openTabLink).invoke('removeAttr', 'target').click();
    return this;
  }

  getTabLink() {
    return cy.get(WindowsLocators.openTabLink);
  }

  // ── ADV-E6: window.open() ────────────────────────────────────────────

  /**
   * Stubs window.open so Cypress captures the call, then clicks the button.
   * Specs verify the stub was called with the expected URL.
   */
  openNewTabViaJs(win: Cypress.AUTWindow) {
    cy.stub(win, 'open').as('windowOpen');
    cy.get(WindowsLocators.openTabJs).click();
    return this;
  }

  getTabButton() {
    return cy.get(WindowsLocators.openTabJs);
  }

  // ── /windows/new.html getters ────────────────────────────────────────

  getNewWindowHeading() {
    return cy.get(WindowsLocators.newWindowHeading);
  }

  getNewWindowBody() {
    return cy.get(WindowsLocators.newWindowBody);
  }
}

export default new WindowsPage();
