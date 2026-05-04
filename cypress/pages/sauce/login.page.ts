import BasePage from '../BasePage';
import { LoginLocators } from '../../locators/sauce/login.locators';

/**
 * LoginPage — Gold Standard.
 * Extends BasePage (1 level, Law 4). Zero assertions inside (Law 2).
 * All selectors live in LoginLocators (Law 1).
 */
export class LoginPage extends BasePage {
  // ── Navigation ────────────────────────────────────────────────────

  openLoginPage() {
    return this.open('/');
  }

  // ── Actions ───────────────────────────────────────────────────────

  login(username: string, password: string) {
    if (username) cy.get(LoginLocators.usernameInput).type(username);
    if (password) cy.get(LoginLocators.passwordInput).type(password);
    cy.get(LoginLocators.loginButton).click();
    return this;
  }

  clickLoginButton() {
    cy.get(LoginLocators.loginButton).click();
    return this;
  }

  // ── Getters — return Chainables; tests do the asserting (Law 2) ───

  getErrorMessage() {
    return cy.get(LoginLocators.errorMessage);
  }

  getLoginWrapper() {
    return cy.get(LoginLocators.loginWrapper);
  }

  getLoginButton() {
    return cy.get(LoginLocators.loginButton);
  }

  getUsernameInput() {
    return cy.get(LoginLocators.usernameInput);
  }

  getLoginLogo() {
    return cy.get(LoginLocators.loginLogo);
  }
}

export default new LoginPage();
