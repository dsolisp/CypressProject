import BasePage from './BasePage'

class LoginPage extends BasePage {
    private usernameInput: string = '[data-test="username"]';
    private passwordInput: string = '[data-test="password"]';
    private loginButton: string = '[data-test="login-button"]';
    private errorMessage: string = '[data-test="error"]';
    private loginWrapper: string = '.login_wrapper';
    private loginLogo: string = '.login_logo';

    constructor() {
        super()
    }

    waitForPageToLoad() {
        this.getElement(this.loginButton).should('be.visible');
    }

    login(username: string, password: string) {
        this.type(this.usernameInput, username)
        this.type(this.passwordInput, password)
        this.click(this.loginButton)
    }

    clickLoginButton() {
        this.click(this.loginButton);
    }

    waitForErrorMessage() {
        this.getElement(this.errorMessage).should('be.visible');
    }

    getErrorMessage() {
        return this.getElement(this.errorMessage)
    }

    getLoginWrapper() {
        return this.getElement(this.loginWrapper);
    }

    getLoginButton() {
        return this.getElement(this.loginButton);
    }

    getUsernameInput() {
        return this.getElement(this.usernameInput);
    }

    getLoginLogo() {
        return this.getElement(this.loginLogo);
    }
}

export default new LoginPage