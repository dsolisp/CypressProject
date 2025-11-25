import LoginPage from "../../pages/LoginPage";
import InventoryPage from "../../pages/InventoryPage";

describe('Login Flow', () => {

    beforeEach(() => {
        LoginPage.open('/')
    })

    /*
    // In your test file
    //This restores the session instantly instead of re-typing credentials.
beforeEach(() => {
  cy.session('standard_user', () => {
    cy.visit('/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
  });
  cy.visit('/inventory.html');
});
*/

    it('should login successfully', () => {
        LoginPage.login('standard_user', 'secret_sauce')
        cy.url().should('include', '/inventory.html')
    })

    it('should fail login using locked out user', () => {
        LoginPage.login('locked_out_user', 'secret_sauce')
        LoginPage.getErrorMessage().should('contain', 'Sorry, this user has been locked out.')
    })
})