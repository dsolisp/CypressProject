import BasePage from '../BasePage';
import { IframesLocators } from '../../locators/practice/iframes.locators';

/**
 * IframesPage — Gold Standard POM for /iframes.html (ADV-E3, ADV-E4).
 * Extends BasePage (1 level, Law 4). Zero assertions inside (Law 2).
 * All selectors live in IframesLocators (Law 1).
 */
export class IframesPage extends BasePage {
  constructor() {
    super();
    this.baseUrl = Cypress.env('practiceBaseUrl') as string;
  }

  // ── Navigation ──────────────────────────────────────────────────────
  openIframesPage() {
    return this.open('/iframes.html');
  }

  // ── ADV-E3: Simple iframe (contenteditable editor) ─────────────────

  getParentFrame() {
    return cy.get(IframesLocators.parentFrame);
  }

  /** Type text into the rich-text editor inside the parent frame. */
  typeInEditor(text: string) {
    cy.get(IframesLocators.parentFrame).within(() => {
      cy.get(IframesLocators.editor).click().type(text);
    });
    return this;
  }

  getEditor() {
    return cy.get(IframesLocators.parentFrame).find(IframesLocators.editor);
  }

  // ── ADV-E4: Nested iframes ──────────────────────────────────────────

  getOuterFrame() {
    return cy.get(IframesLocators.outerFrame);
  }

  /** Submit the inner form inside the nested iframes. */
  submitInnerForm(name: string, email: string) {
    cy.get(IframesLocators.outerFrame).within(() => {
      cy.get(IframesLocators.childFrame).within(() => {
        cy.get(IframesLocators.innerName).type(name);
        cy.get(IframesLocators.innerEmail).type(email);
        cy.get(IframesLocators.innerSubmit).click();
      });
    });
    return this;
  }

  getInnerResult() {
    return cy.get(IframesLocators.outerFrame).find(IframesLocators.innerResult);
  }
}

export default new IframesPage();
