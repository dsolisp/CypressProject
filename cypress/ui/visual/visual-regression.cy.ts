import LoginPage from '../../pages/sauce/login.page';
import InventoryPage from '../../pages/sauce/inventory.page';
import VisualHelper from '../../utils/visual.helper';

/**
 * Visual Regression — Gold Standard.
 * Uses Gold Standard POMs (pages/sauce/) and VisualHelper (utils/).
 * cy.loginAsStandardUser() handles session caching (ADR-009).
 * Law 2 compliance: VisualHelper only provides config objects and setViewport().
 * The assertion — cy.compareSnapshot() / element.compareSnapshot() — is always
 * called HERE in the spec so the intent is visible to every reader.
 */
describe('Visual Regression Testing @visual', () => {

  // ── Login Page visual states ────────────────────────────────────────
  describe('Login Page — Visual States', () => {
    beforeEach(() => {
      LoginPage.openLoginPage();
    });

    it('should match baseline for default login page', () => {
      LoginPage.getLoginButton().should('be.visible');
      cy.compareSnapshot('login-page-default-state', VisualHelper.viewportConfig);
    });

    it('should match baseline for login error state', () => {
      LoginPage.clickLoginButton();
      LoginPage.getErrorMessage().should('be.visible');
      cy.compareSnapshot('login-page-error-state', VisualHelper.viewportConfig);
    });

    it('should match baseline for login form component only', () => {
      LoginPage.getLoginWrapper().compareSnapshot('login-form-component', VisualHelper.viewportConfig);
    });
  });

  // ── Inventory Page visual states ────────────────────────────────────
  describe('Inventory Page — Full Page Capture', () => {
    beforeEach(() => {
      cy.loginAsStandardUser();
      cy.visit('/inventory.html');
    });

    it('should match baseline for inventory page full scroll', () => {
      InventoryPage.getInventoryItems().should('have.length.greaterThan', 0);
      cy.compareSnapshot('inventory-page-full', VisualHelper.fullPageConfig);
    });

    it('should match baseline ignoring cart badge (dynamic content)', () => {
      cy.compareSnapshot('inventory-page-clean', VisualHelper.withBlackout(['.shopping_cart_badge']));
    });
  });

  // ── Responsive Layout — Cross-Device ────────────────────────────────
  describe('Responsive Layout — Cross-Device', () => {
    beforeEach(() => {
      LoginPage.openLoginPage();
    });

    it('should match baseline for mobile view (iPhone X)', () => {
      VisualHelper.setViewport('mobile');
      cy.compareSnapshot('login-page-mobile', VisualHelper.viewportConfig);
    });

    it('should match baseline for tablet view (iPad)', () => {
      VisualHelper.setViewport('tablet');
      cy.compareSnapshot('login-page-tablet', VisualHelper.viewportConfig);
    });

    it('should match baseline for desktop view (1920x1080)', () => {
      VisualHelper.setViewport('desktop');
      cy.compareSnapshot('login-page-desktop', VisualHelper.viewportConfig);
    });
  });

  // ── Advanced snapshot comparisons ───────────────────────────────────
  describe('Advanced Snapshot Comparisons', () => {
    beforeEach(() => {
      cy.loginAsStandardUser();
      cy.visit('/inventory.html');
    });

    it('should allow minor differences with 10% threshold', () => {
      cy.compareSnapshot('inventory-flexible-comparison', VisualHelper.withThreshold(0.10));
    });

    it('should detect even tiny differences with strict 1% threshold', () => {
      cy.compareSnapshot('inventory-strict-comparison', VisualHelper.withThreshold(0.01));
    });
  });

  // ── Component visual snapshots ───────────────────────────────────────
  describe('Component Visual Snapshots', () => {
    beforeEach(() => {
      LoginPage.openLoginPage();
    });

    it('should match baseline for login button component', () => {
      LoginPage.getLoginButton().compareSnapshot('login-button-component', VisualHelper.viewportConfig);
    });

    it('should match baseline for username input field', () => {
      LoginPage.getUsernameInput().compareSnapshot('username-input-component', VisualHelper.viewportConfig);
    });

    it('should match baseline for login logo', () => {
      LoginPage.getLoginLogo().compareSnapshot('login-logo-component', VisualHelper.viewportConfig);
    });
  });
});
