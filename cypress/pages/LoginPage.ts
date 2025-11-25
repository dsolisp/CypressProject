import BasePage from './BasePage'


class LoginPage extends BasePage {
    usernameInput: string = '[data-test="username"]';
    passwordInput: string = '[data-test="password"]';
    loginButton: string = '[data-test="login-button"]';
    errorMessage: string = '[data-test="error"]';

    constructor() {
        super()
    }

    login(username:string, password:string){
        this.type(this.usernameInput, username)
        this.type(this.passwordInput, password)
        this.click(this.loginButton)
    }

    getErrorMessage(){
        return this.getElement(this.errorMessage)
    }
    
}

export default new LoginPage