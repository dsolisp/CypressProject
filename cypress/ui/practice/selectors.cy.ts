import SelectorsPage from '../../pages/practice/selectors.page';

/**
 * Selector Playground — all 10 selector strategies demonstrated.
 * Each test exercises one approach from the /selectors.html showcase.
 */
describe('Practice App — Selector Playground @practice @selectors', () => {
  beforeEach(() => {
    SelectorsPage.openSelectorsPage();
  });

  it('S1 · id & name: should locate inputs by data-test (mirrors id/name)', () => {
    SelectorsPage.getUsernameInput()
      .should('be.visible')
      .and('have.attr', 'id', 'username-field');
    SelectorsPage.getPasswordInput()
      .should('be.visible')
      .and('have.attr', 'name', 'password');
  });

  it('S2 · CSS class: should locate primary and secondary buttons', () => {
    SelectorsPage.getPrimaryButton().should('have.class', 'btn-primary');
    SelectorsPage.getSecondaryButton().should('have.class', 'btn-secondary');
  });

  it('S2 · CSS class: should locate status badges by variant', () => {
    SelectorsPage.getSuccessBadge().should('have.text', 'Active');
    SelectorsPage.getWarningBadge().should('have.text', 'Pending');
    SelectorsPage.getErrorBadge().should('have.text', 'Inactive');
  });

  it('S3 · link text: should locate links by exact and partial text', () => {
    SelectorsPage.getExactLink().should('contain.text', 'Download Report');
    SelectorsPage.getPartialLink().should('contain.text', 'Annual Summary');
  });

  it('S3 · link text: should locate link by aria-label', () => {
    SelectorsPage.getAriaLink().should(
      'have.attr',
      'aria-label',
      'Download the PDF document'
    );
  });

  it('S4 · ARIA: should locate input by role and aria-label', () => {
    SelectorsPage.getEmailInput()
      .should('have.attr', 'role', 'textbox')
      .and('have.attr', 'aria-label', 'Work email address');
  });

  it('S4 · ARIA: live region should update on trigger', () => {
    SelectorsPage.getLiveRegion().should('exist');
    SelectorsPage.triggerLiveRegion();
    SelectorsPage.getLiveRegion().should('contain', 'Updated at');
  });

  it('S5 · form attrs: disabled input should not be editable', () => {
    SelectorsPage.getDisabledInput().should('be.disabled');
  });

  it('S5 · form attrs: radio Pro should be pre-checked', () => {
    SelectorsPage.getRadioPro().should('be.checked');
    SelectorsPage.getRadioBasic().should('not.be.checked');
  });

  it('S5 · form attrs: should select a country from the dropdown', () => {
    SelectorsPage.selectCountry('us');
    SelectorsPage.getDisabledInput().should('be.disabled'); // guard: page still stable
  });

  it('S6 · data attributes: should locate products by data-test + data-category', () => {
    SelectorsPage.getProductItems().should('have.length', 3);
    SelectorsPage.getElectronicsItems().should('have.length', 2);
  });

  it('S7 · image alt/title: should locate logo by alt text', () => {
    SelectorsPage.getLogo()
      .should('have.attr', 'alt', 'QA Practice Lab logo')
      .and('have.attr', 'title', 'QA Practice Lab');
  });

  it('S8 · title attribute: should locate buttons by title', () => {
    SelectorsPage.getSaveButton().should(
      'have.attr',
      'title',
      'Save your current progress'
    );
    SelectorsPage.getDeleteButton().should(
      'have.attr',
      'title',
      'Delete this record permanently'
    );
  });

  it('S8 · title attribute: should locate abbr elements by title', () => {
    SelectorsPage.getAbbrQA().should('have.attr', 'title', 'Quality Assurance');
  });

  it('S9 · table: should have 3 data rows', () => {
    SelectorsPage.getTableRows().should('have.length', 3);
    SelectorsPage.getTableRowNameCell(2).should('have.text', 'Bob');
  });

  it('S10 · XPath targets: should locate fruit items via data-test', () => {
    SelectorsPage.getFruitItems().should('have.length', 3);
    SelectorsPage.getFruitItems().eq(1).should('have.text', 'Banana');
  });

  it('S10 · XPath targets: should locate elements by text content via cy.contains', () => {
    SelectorsPage.getXpathText().should('contain', 'quick brown fox');
    SelectorsPage.getXpathPartial().should('contain', 'partial text');
  });
});
