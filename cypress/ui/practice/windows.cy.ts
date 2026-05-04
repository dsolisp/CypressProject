import WindowsPage from '../../pages/practice/windows.page';

/**
 * ADV-E5 — Open new tab via target="_blank"
 * ADV-E6 — Open new tab via window.open()
 *
 * Cypress runs in a single tab. Strategies used:
 *   E5 — strip target="_blank" so the link navigates in the same tab.
 *   E6 — stub window.open and assert it was called with the correct URL.
 */
describe('Practice App — New Window / Tab @practice @smoke', () => {
  beforeEach(() => {
    WindowsPage.openWindowsPage();
  });

  // ── ADV-E5: target="_blank" link ────────────────────────────────────
  describe('ADV-E5: Open via target="_blank"', () => {
    it('should have the correct href on the new-tab link', () => {
      WindowsPage.getTabLink()
        .should('have.attr', 'href')
        .and('include', '/windows/new');
    });

    it('should navigate to the new window page when target is removed', () => {
      WindowsPage.openNewTabViaLink();
      WindowsPage.getNewWindowHeading().should('have.text', 'New Window');
      WindowsPage.getNewWindowBody().should('contain', 'opened in a new tab');
    });
  });

  // ── ADV-E6: window.open() ────────────────────────────────────────────
  describe('ADV-E6: Open via window.open()', () => {
    it('should call window.open with the correct URL when button is clicked', () => {
      cy.window().then((win) => {
        WindowsPage.openNewTabViaJs(win);
        // cy.wrap() subjects a sinon stub to Cypress retryability without a raw cy.get() call
        cy.wrap(win.open).should('have.been.calledWithMatch', '/windows/new');
      });
    });

    it('should display the button with visible text', () => {
      WindowsPage.getTabButton()
        .should('be.visible')
        .and('contain', 'Open a New Window');
    });
  });
});
