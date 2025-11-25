import InteractionsPage from "../../pages/InteractionsPage"

describe('Interactions', () => {

    it('Interaction 1: Hover reveals hidden content', () => {
        InteractionsPage.visitHover()
        InteractionsPage.hoverOverFigure().then((el) => {
            cy.wrap(el).find(InteractionsPage.hoverCaption).should('have.text', 'name: user1')
        })
    })

    // Example 2: Drag and Drop
    it('Example 2: Drag and Drop', () => {
        InteractionsPage.visitDragAndDrop();
        InteractionsPage.dragAndDrop();
    });

    // Example 3: File Upload
    it('Example 3: File Upload', () => {
        InteractionsPage.visitFileUpload();
        InteractionsPage.uploadFile('cypress/fixtures/example.json');
        InteractionsPage.getUploadedMessage().should('contain', 'File Uploaded!');
    });

    // Example 4: Long Scroll / Lazy Load
    it('Example 4: Long Scroll', () => {
        InteractionsPage.visitInfiniteScroll();
        InteractionsPage.scrollToBottom();
        cy.wait(1000); // Wait for content to load
        InteractionsPage.scrollToBottom();
        InteractionsPage.getScrollContent().should('exist');
    });

    // Example 5: Keyboard Shortcuts
    it('Example 5: Keyboard Actions', () => {
        InteractionsPage.visitKeyPresses();
        InteractionsPage.typeKeyPress('{rightArrow}');
        InteractionsPage.getKeyPressResult().should('contain', 'RIGHT');

        InteractionsPage.typeGlobal('{esc}');
    });

})
