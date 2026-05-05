/**
 * LoginLocators — all selectors for the SauceDemo login page.
 * Pure selector definitions only — zero logic, zero assertions (Law 1 & Law 2).
 */
export const LoginLocators = {
  usernameInput: '[data-test="username"]',
  passwordInput: '[data-test="password"]',
  loginButton: '[data-test="login-button"]',
  errorMessage: '[data-test="error"]',
  loginWrapper: '.login_wrapper',
  loginLogo: '.login_logo',
} as const;
