describe("Hybrid DB Testing Patterns", () => {
    before(() => {
        //Reset and seed the DB
        cy.exec('node scripts/seed_db.js')
    })

    //Example 1: Seed -> Login (Precondition)
    it('Example 1: Seeds a user and logs in', () => {
        // 1. Seed the DB
        const testUser = {
            id: 101,
            username: 'db_user',
            password: 'pasword123'
        }
        cy.task('queryDb', `INSERT INTO users VALUES(${testUser.id}, "${testUser.username}", "customer")`)

        // 2 Use Data in UI
        cy.visit('/')
        cy.get('[data-test="username"]').type(testUser.username)
        cy.get('[data-test="password"]').type(testUser.password)
        cy.get('[data-test="login-button"]').click()

        // 3. Verify Login Fails (Expected, since we can't actually seed SauceDemo's real DB)
        cy.get('[data-test="error"]').should('be.visible')
            .and('contain', 'Username and password do not match');
    })

    //Example 2: UI Action -> DB Verification (Postcondition)
    it('Example 2: Logs in and verifies user exists in DB', () => {
        // 1 Login
        cy.visit('/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        // 2. Verify successful login (UI check)
        cy.url().should('include', '/inventory.html');

        // 3. Verify cart count in DB (simulated - in real app would check cart table)
        // For demo purposes, we verify user logged in exists in DB
        cy.task('queryDb', 'SELECT * FROM users WHERE username="standard_user"')
            .then((rows) => {
                expect(rows).to.have.length(1);
                expect(rows[0].role).to.exist;
            });
    })

    // Example 3: DB Data -> UI Assertion (Data Driven)
    it('Example 3: Verifies UI displays correct product price from DB', () => {
        cy.visit('/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        // 1. Get Truth from DB
        cy.task('queryDb', 'SELECT price FROM products WHERE name="Sauce Labs Backpack"')
            .then((rows) => {
                const dbPrice = rows[0].price; // e.g., 29.99

                // 2. Verify UI matches DB
                cy.visit('/inventory.html', {
                    failOnStatusCode: false 
                });
                cy.contains('Sauce Labs Backpack')
                    .parents('.inventory_item')
                    .find('.inventory_item_price')
                    .should('contain', dbPrice);
            });
    });

    // Example 4: Data-Driven Testing (Iterate from DB)
    it('Example 4: Data-Driven Login from Database', () => {

        // 1. Get all users with 'customer' role (excluding the fake one from Example 1)
        cy.task('queryDb', 'SELECT * FROM users WHERE role="customer" AND username != "db_user"')
            .then((users) => {
                // 2. Iterate through each user
                users.forEach((user) => {
                    cy.visit('/');
                    cy.get('[data-test="username"]').type(user.username);
                    cy.get('[data-test="password"]').type('secret_sauce');
                    cy.get('[data-test="login-button"]').click();
                    cy.url().should('include', '/inventory.html');

                    // Logout to reset state for next iteration
                    cy.get('#react-burger-menu-btn').click();
                    cy.get('#logout_sidebar_link').click();
                });
            });
    });

    // Example 5: CRUD Lifecycle (Create, Read, Delete)
    it('Example 5: Verifies database data persistence and cleanup', () => {
        // 1. Create (Setup)
        const newUserId = 999;
        cy.task('queryDb', `INSERT INTO users VALUES (${newUserId}, "test_cleanup_user", "tester")`);

        // 2. Read (Verify Creation)
        cy.task('queryDb', `SELECT * FROM users WHERE id=${newUserId}`)
            .then((rows) => {
                expect(rows).to.have.length(1);
                expect(rows[0].username).to.eq('test_cleanup_user');
            });

        // 3. Delete (Teardown/Cleanup)
        cy.task('queryDb', `DELETE FROM users WHERE id=${newUserId}`);

        // 4. Verify Deletion
        cy.task('queryDb', `SELECT * FROM users WHERE id=${newUserId}`)
            .then((rows) => {
                expect(rows).to.be.empty;
            });
    });

})
