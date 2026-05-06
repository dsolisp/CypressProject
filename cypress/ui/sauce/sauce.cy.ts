import LoginPage from '../../pages/sauce/login.page';
import InventoryPage from '../../pages/sauce/inventory.page';
import CartPage from '../../pages/sauce/cart.page';
import CheckoutPage from '../../pages/sauce/checkout.page';
import { UserBuilder } from '../../utils/builders/user.builder';
import { CheckoutBuilder } from '../../utils/builders/checkout.builder';

// ── Login Tests ───────────────────────────────────────────────────────
describe('SauceDemo — Login @auth @smoke', () => {
  beforeEach(() => {
    LoginPage.openLoginPage();
  });

  it('should login with valid credentials', () => {
    const user = new UserBuilder().standard().build();
    LoginPage.login(user.username, user.password);
    cy.url().should('include', '/inventory.html');
  });

  it('should show error for locked out user', () => {
    const user = new UserBuilder().locked().build();
    LoginPage.login(user.username, user.password);
    LoginPage.getErrorMessage()
      .should('be.visible')
      .and('contain', 'locked out');
  });

  it('should show error for invalid credentials', () => {
    const user = new UserBuilder().invalid().build();
    LoginPage.login(user.username, user.password);
    LoginPage.getErrorMessage()
      .should('be.visible')
      .and('contain', 'do not match');
  });

  it('should show error for empty username', () => {
    LoginPage.login('', 'secret_sauce');
    LoginPage.getErrorMessage()
      .should('be.visible')
      .and('contain', 'Username is required');
  });

  it('should show error for empty password', () => {
    const user = new UserBuilder().standard().build();
    LoginPage.login(user.username, '');
    LoginPage.getErrorMessage()
      .should('be.visible')
      .and('contain', 'Password is required');
  });
});

// ── Inventory Tests ───────────────────────────────────────────────────
describe('SauceDemo — Inventory @cart @regression', () => {
  beforeEach(() => {
    cy.loginAsStandardUser();
    cy.visit('/inventory.html', { failOnStatusCode: false });
  });

  it('should display 6 products @smoke', () => {
    InventoryPage.getInventoryItems().should('have.length', 6);
  });

  it('should display product names', () => {
    InventoryPage.getItemNames().should('have.length', 6);
  });

  it('should add item to cart and update badge @smoke', () => {
    InventoryPage.addBackpackToCart();
    cy.headerGetCartBadge().should('have.text', '1');
  });

  it('should add multiple items to cart', () => {
    InventoryPage.addBackpackToCart().addBikeLightToCart();
    cy.headerGetCartBadge().should('have.text', '2');
  });

  it('should sort products by name A-Z', () => {
    InventoryPage.sortBy('az');
    InventoryPage.getItemNames().then(($els) => {
      const names = Array.from($els).map((el: Element) => el.textContent ?? '');
      const sorted = [...names].sort();
      expect(names).to.deep.equal(sorted);
    });
  });

  it('should sort products by price low to high', () => {
    InventoryPage.sortBy('lohi');
    InventoryPage.getItemPrices().then(($els) => {
      const prices = Array.from($els).map((el: Element) =>
        parseFloat((el.textContent ?? '').replace('$', ''))
      );
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).to.deep.equal(sorted);
    });
  });
});

// ── Checkout Flow ─────────────────────────────────────────────────────
describe('SauceDemo — Checkout @checkout @smoke', () => {
  beforeEach(() => {
    cy.loginAsStandardUser();
    cy.visit('/inventory.html', { failOnStatusCode: false });
  });

  it('should complete full checkout flow', () => {
    const checkoutInfo = new CheckoutBuilder().valid().build();

    // Add item and go to cart
    InventoryPage.addBackpackToCart().goToCart();
    CartPage.getCartItems().should('have.length', 1);

    // Checkout
    CartPage.checkout();
    CheckoutPage.fillWithInfo(checkoutInfo).continue().finish();

    // Verify completion — zero selectors in this spec (Law 3)
    CheckoutPage.getCompleteHeader()
      .should('be.visible')
      .and('contain', 'Thank you');
  });

  it('should allow removing item from cart', () => {
    InventoryPage.addBackpackToCart().goToCart();
    CartPage.getCartItems().should('have.length', 1);
    CartPage.removeItemByIndex(0);
    CartPage.getCartItems().should('have.length', 0);
  });
});
