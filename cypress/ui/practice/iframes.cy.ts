import IframesPage from '../../pages/practice/iframes.page';

/**
 * ADV-E3 — Simple iframe with contenteditable editor
 * ADV-E4 — Nested iframes (outer → inner form)
 *
 * Note: cy.within() is used to scope commands inside an iframe element.
 * Cypress treats same-origin iframes as first-class DOM — no cy.iframe() plugin needed.
 */
describe('Practice App — Iframes @practice', () => {
  beforeEach(() => {
    IframesPage.openIframesPage();
  });

  // ── ADV-E3: Simple iframe (contenteditable editor) ──────────────────
  describe('ADV-E3: Simple iframe — contenteditable editor', () => {
    it('should display the editor iframe on the page', () => {
      IframesPage.getParentFrame().should('be.visible');
    });

    it('should allow typing in the contenteditable editor inside the iframe', () => {
      IframesPage.typeInEditor('Hello from Cypress!');
      IframesPage.getEditor().should('contain.text', 'Hello from Cypress!');
    });

    it('should clear the editor and accept new text', () => {
      IframesPage.typeInEditor('First text');
      IframesPage.getEditor().clear().type('Replaced text');
      IframesPage.getEditor().should('contain.text', 'Replaced text');
    });
  });

  // ── ADV-E4: Nested iframes ───────────────────────────────────────────
  describe('ADV-E4: Nested iframes — outer → inner form', () => {
    it('should display the outer frame on the page', () => {
      IframesPage.getOuterFrame().should('be.visible');
    });

    it('should submit the inner form and show the submitted result', () => {
      IframesPage.submitInnerForm('Alice', 'alice@example.com');
      IframesPage.getInnerResult()
        .should('contain', 'Alice')
        .and('contain', 'alice@example.com');
    });

    it('should show the result with no name when name is omitted', () => {
      IframesPage.submitInnerForm('', 'test@example.com');
      IframesPage.getInnerResult().should('contain', '(no name)');
    });
  });
});
