import BasePage from "./BasePage";

class InteractionsPage extends BasePage {
    constructor() {
        super()
        //Override BasePage Url
        this.baseUrl = 'https://the-internet.herokuapp.com'
    }

    //Selectors
    hoverFigure: string = '.figure'
    hoverCaption: string = '.figcaption h5';
    dragSource: string = '#column-a';
    dragTarget: string = '#column-b';
    fileInput: string = '#file-upload';
    fileSubmit: string = '#file-submit';
    uploadedFiles: string = 'h3';
    keyPressTarget: string = '#target';
    keyPressResult: string = '#result';
    scrollContent: string = '.jscroll-added';

    visitHover() {
        this.open('/hovers')
    }

    hoverOverFigure() {
        return this.getElement(this.hoverFigure).first().trigger('mouseover')
    }

    getHoverCaption() {
        return this.getElement(this.hoverCaption)
    }

    visitDragAndDrop() {
        this.open('/drag_and_drop')
    }

    dragAndDrop() {
        const dataTransfer = new DataTransfer()
        this.getElement(this.dragTarget).trigger('dragstart', { dataTransfer })
        this.getElement(this.dragSource).trigger('drop', { dataTransfer })
    }

    visitFileUpload() {
        this.open('/upload');
    }

    uploadFile(filePath: string) {
        this.getElement(this.fileInput).selectFile(filePath);
        this.click(this.fileSubmit);
    }

    getUploadedMessage() {
        return this.getElement(this.uploadedFiles);
    }

    visitInfiniteScroll() {
        this.open('/infinite_scroll');
    }

    scrollToBottom() {
        cy.scrollTo('bottom');
    }

    getScrollContent() {
        return this.getElement(this.scrollContent);
    }

    visitKeyPresses() {
        this.open('/key_presses');
    }

    typeKeyPress(key: string) {
        this.type(this.keyPressTarget, key);
    }

    typeGlobal(key: string) {
        cy.get('body').type(key);
    }

    getKeyPressResult() {
        return this.getElement(this.keyPressResult);
    }

}

export default new InteractionsPage()