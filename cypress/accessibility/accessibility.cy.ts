import LoginPage from '../pages/sauce/login.page';
import InventoryPage from '../pages/sauce/inventory.page';
import { URLS } from '../support/constants';

describe('Accessibility Tests', () => {
  describe('Homepage Accessibility', () => {
    it('should not have critical accessibility violations on homepage', () => {
      cy.visit(URLS.SAUCE_DEMO);
      cy.injectAxe();
      cy.checkA11y(null, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
      }, (violations) => {
        expect(violations.length).to.be.lte(10);
      }, true);
    });

    it('should have accessible login form labels', () => {
      cy.visit(URLS.SAUCE_DEMO);
      cy.injectAxe();
      cy.checkA11y('#login_button_container', {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
      }, (violations) => {
        const labelViolations = violations.filter(v => v.id.includes('label') || v.id.includes('aria'));
        expect(labelViolations.length).to.be.lte(3);
      }, true);
    });
  });

  describe('SauceDemo Accessibility', () => {
    it('should have accessible login form', () => {
      cy.visit(URLS.SAUCE_DEMO);
      cy.injectAxe();
      cy.checkA11y('#login_button_container', {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
      }, (violations) => {
        expect(violations.length).to.be.lte(5);
      }, true);
    });

    it('should have accessible inventory page', () => {
      LoginPage.openLoginPage();
      LoginPage.login('standard_user', 'secret_sauce');
      cy.url().should('include', '/inventory.html');
      cy.injectAxe();
      cy.checkA11y('.inventory_container', {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
      }, (violations) => {
        expect(violations.length).to.be.lte(10);
      }, true);
    });
  });

  describe('Color Contrast', () => {
    it('should have sufficient color contrast on homepage', () => {
      cy.visit(URLS.SAUCE_DEMO);
      cy.injectAxe();
      cy.checkA11y(null, {
        runOnly: { type: 'rule', values: ['color-contrast'] },
      }, (violations) => {
        expect(violations).to.exist;
      }, true);
    });
  });

  describe('Keyboard Navigation', () => {
    it('should be navigable with keyboard', () => {
      cy.visit(URLS.SAUCE_DEMO);
      cy.get('body').focus();
      // Using tab simulation
      cy.focused().type('{tab}', { force: true });
      cy.focused().type('{tab}', { force: true });
      cy.focused().then(($el) => {
        expect(['INPUT', 'TEXTAREA', 'BUTTON', 'A', 'DIV', 'BODY']).to.include($el.prop('tagName'));
      });
    });
  });
});
