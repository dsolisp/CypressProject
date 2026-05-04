import AlertsPage from '../../pages/practice/alerts.page';

/**
 * ADV-E7 — Simple alert
 * ADV-E8 — Confirm dialog
 * ADV-E9 — Prompt dialog
 */
describe('Practice App — JS Alerts @practice @smoke', () => {
  beforeEach(() => {
    AlertsPage.openAlertsPage();
  });

  // ── ADV-E7: Simple alert ──────────────────────────────────────────────
  describe('ADV-E7: Simple alert', () => {
    it('should dismiss alert automatically and update result text', () => {
      // Cypress auto-accepts alert() dialogs
      cy.on('window:alert', (text) => {
        expect(text).to.equal('This is a simple alert!');
      });
      AlertsPage.triggerAlert();
      AlertsPage.getResultText().should('have.text', 'Alert accepted.');
    });
  });

  // ── ADV-E8: Confirm dialog ────────────────────────────────────────────
  describe('ADV-E8: Confirm dialog', () => {
    it('should update result text when user accepts', () => {
      cy.on('window:confirm', () => true);
      AlertsPage.triggerConfirm();
      AlertsPage.getResultText().should('have.text', 'Confirm accepted.');
    });

    it('should update result text when user dismisses', () => {
      cy.on('window:confirm', () => false);
      AlertsPage.triggerConfirm();
      AlertsPage.getResultText().should('have.text', 'Confirm dismissed.');
    });
  });

  // ── ADV-E9: Prompt dialog ─────────────────────────────────────────────
  describe('ADV-E9: Prompt dialog', () => {
    it('should echo the entered text in the result', () => {
      cy.window().then((win) => {
        cy.stub(win, 'prompt').returns('Daniel');
      });
      AlertsPage.triggerPrompt();
      AlertsPage.getResultText().should('contain', 'Daniel');
    });

    it('should show dismissed message when prompt is cancelled', () => {
      cy.window().then((win) => {
        cy.stub(win, 'prompt').returns(null);
      });
      AlertsPage.triggerPrompt();
      AlertsPage.getResultText().should('have.text', 'Prompt dismissed.');
    });
  });
});
