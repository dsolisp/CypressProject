export default class BasePage {
    baseUrl: string;

    constructor() {
        this.baseUrl = 'https://www.saucedemo.com';
    }

    open(path: string) {
        cy.visit(this.baseUrl + path);
    }

    getElement(selector: string) {
        return cy.get(selector)
    }

    click(selector: string) {
        this.getElement(selector).click()
    }

    type(selector: string, text: string){
        this.getElement(selector).type(text)
    }

    getText(selector: string){
        return this.getElement(selector).then(($el) => {
            return $el.text()
        })
    }
}