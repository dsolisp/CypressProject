import LoginPage from '../../pages/LoginPage';
import InventoryPage from '../../pages/InventoryPage';
import VisualTestingPage from '../../pages/VisualTestingPage';

describe('Visual Regression Testing', () => {

    describe('Login Page - Visual States', () => {
        beforeEach(() => {
            LoginPage.open('/');
        });

        it('Should match baseline for default login page', () => {
            LoginPage.waitForPageToLoad();
            VisualTestingPage.takeViewportSnapshot('login-page-default-state');
        });

        it('Should match baseline for login error state', () => {
            LoginPage.clickLoginButton();
            LoginPage.waitForErrorMessage();
            VisualTestingPage.takeViewportSnapshot('login-page-error-state');
        });

        it('Should match baseline for login form component only', () => {
            VisualTestingPage.takeElementSnapshotFromChainable(
                LoginPage.getLoginWrapper(),
                'login-form-component'
            );
        });
    });

    describe('Inventory Page - Full Page Capture', () => {
        beforeEach(() => {
            LoginPage.open('/');
            LoginPage.login('standard_user', 'secret_sauce');
            cy.url().should('include', '/inventory.html');
        });

        it('Should match baseline for inventory page full scroll', () => {
            InventoryPage.waitForProductsToLoad();
            VisualTestingPage.takeFullPageSnapshot('inventory-page-full');
        });

        it('Should match baseline ignoring cart badge (dynamic content)', () => {
            VisualTestingPage.takeSnapshotIgnoringElements(
                'inventory-page-clean',
                ['.shopping_cart_badge']
            );
        });
    });

    describe('Responsive Layout - Cross-Device', () => {
        beforeEach(() => {
            LoginPage.open('/');
        });

        it('Should match baseline for mobile view (iPhone X)', () => {
            VisualTestingPage.takeMobileSnapshot('login-page-mobile-iphone-x');
        });

        it('Should match baseline for tablet view (iPad)', () => {
            VisualTestingPage.takeTabletSnapshot('login-page-tablet-ipad');
        });

        it('Should match baseline for desktop view (1920x1080)', () => {
            VisualTestingPage.takeDesktopSnapshot('login-page-desktop-1080p');
        });
    });

    describe('Advanced Snapshot Comparisons', () => {
        beforeEach(() => {
            LoginPage.open('/');
            LoginPage.login('standard_user', 'secret_sauce');
            cy.url().should('include', '/inventory.html');
        });

        it('Should allow minor differences with 10% threshold', () => {
            VisualTestingPage.takeFlexibleSnapshot('inventory-flexible-comparison', 0.10);
        });

        it('Should detect even tiny differences with strict 1% threshold', () => {
            VisualTestingPage.takeFlexibleSnapshot('inventory-strict-comparison', 0.01);
        });
    });

    describe('Component Visual Snapshots', () => {
        beforeEach(() => {
            LoginPage.open('/');
        });

        it('Should match baseline for login button component', () => {
            VisualTestingPage.takeElementSnapshotFromChainable(
                LoginPage.getLoginButton(),
                'login-button-component'
            );
        });

        it('Should match baseline for username input field', () => {
            VisualTestingPage.takeElementSnapshotFromChainable(
                LoginPage.getUsernameInput(),
                'username-input-component'
            );
        });

        it('Should match baseline for login logo', () => {
            VisualTestingPage.takeElementSnapshotFromChainable(
                LoginPage.getLoginLogo(),
                'login-logo-component'
            );
        });
    });

});
