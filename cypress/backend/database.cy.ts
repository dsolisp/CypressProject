import LoginPage from '../pages/sauce/login.page';
import InventoryPage from '../pages/sauce/inventory.page';
import { UserBuilder } from '../utils/builders/user.builder';

/**
 * Hybrid DB Testing Patterns — Gold Standard.
 *
 * Demonstrates 5 patterns for combining UI automation with a local SQLite database:
 *   1. Seed → Login (precondition seeding)
 *   2. UI Action → DB Verification (postcondition check)
 *   3. DB Data → UI Assertion (data-driven from DB)
 *   4. Data-Driven Testing (iterate users from DB)
 *   5. CRUD Lifecycle (create, read, delete + verify)
 *
 * The practice DB is seeded by scripts/seed_db.js before the suite runs.
 * cy.dbQuery() wraps the Node sqlite3 task registered in cypress.config.ts.
 */
describe('Hybrid DB Testing Patterns @db', () => {
  before(() => {
    cy.exec('node scripts/seed_db.js');
  });

  // ── Example 1: Seed → Login (Precondition) ──────────────────────────
  it('Example 1: Seeds a user then attempts login', () => {
    const testUser = { id: 101, username: 'db_user', password: 'password123' };
    cy.dbQuery(
      `INSERT OR IGNORE INTO users VALUES(${testUser.id}, "${testUser.username}", "customer")`
    );

    LoginPage.openLoginPage();
    LoginPage.login(testUser.username, testUser.password);

    // Expected: login fails — we can't seed SauceDemo's real backend
    LoginPage.getErrorMessage()
      .should('be.visible')
      .and('contain', 'do not match');
  });

  // ── Example 2: UI Action → DB Verification (Postcondition) ──────────
  it('Example 2: Logs in then verifies user exists in local DB', () => {
    const user = new UserBuilder().standard().build();

    LoginPage.openLoginPage();
    LoginPage.login(user.username, user.password);
    cy.url().should('include', '/inventory.html');

    cy.dbQuery(`SELECT * FROM users WHERE username="${user.username}"`)
      .then((rows: unknown[]) => {
        expect(rows).to.have.length(1);
        expect((rows[0] as { role: string }).role).to.exist;
      });
  });

  // ── Example 3: DB Data → UI Assertion (Data-Driven) ─────────────────
  it('Example 3: Verifies UI price matches DB price for Backpack', () => {
    const user = new UserBuilder().standard().build();
    LoginPage.openLoginPage();
    LoginPage.login(user.username, user.password);
    cy.url().should('include', '/inventory.html');

    cy.dbQuery('SELECT price FROM products WHERE name="Sauce Labs Backpack"')
      .then((rows: unknown[]) => {
        const dbPrice = (rows[0] as { price: string }).price;
        InventoryPage.getItemPrices()
          .first()
          .invoke('text')
          .should('contain', String(dbPrice));
      });
  });

  // ── Example 4: Data-Driven Login (Iterate from DB) ───────────────────
  it('Example 4: Logs in with every customer-role user from DB', () => {
    const password = new UserBuilder().standard().build().password;
    cy.dbQuery('SELECT * FROM users WHERE role="customer" AND username != "db_user"')
      .then((users: unknown[]) => {
        (users as { username: string }[]).forEach((user) => {
          LoginPage.openLoginPage();
          LoginPage.login(user.username, password);
          cy.url().should('include', '/inventory.html');
          cy.headerLogout();
        });
      });
  });

  // ── Example 5: CRUD Lifecycle ─────────────────────────────────────────
  it('Example 5: Create → Read → Delete lifecycle in the local DB', () => {
    const newUserId = 999;

    // Create
    cy.dbQuery(`INSERT OR REPLACE INTO users VALUES (${newUserId}, "test_cleanup_user", "tester")`);

    // Read
    cy.dbQuery(`SELECT * FROM users WHERE id=${newUserId}`)
      .then((rows: unknown[]) => {
        expect(rows).to.have.length(1);
        expect((rows[0] as { username: string }).username).to.eq('test_cleanup_user');
      });

    // Delete
    cy.dbQuery(`DELETE FROM users WHERE id=${newUserId}`);

    // Verify deletion
    cy.dbQuery(`SELECT * FROM users WHERE id=${newUserId}`)
      .then((rows: unknown[]) => {
        expect(rows).to.be.empty;
      });
  });
});
