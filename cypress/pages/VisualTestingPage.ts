import BasePage from './BasePage';

class VisualTestingPage extends BasePage {
    private defaultSnapshotConfig = {
        errorThreshold: 0.05,
        capture: 'viewport' as const,
    };

    constructor() {
        super();
    }

    takeFullPageSnapshot(name: string, customConfig?: any) {
        cy.compareSnapshot(name, {
            ...this.defaultSnapshotConfig,
            capture: 'fullPage',
            ...customConfig,
        });
    }

    takeViewportSnapshot(name: string, customConfig?: any) {
        cy.compareSnapshot(name, {
            ...this.defaultSnapshotConfig,
            ...customConfig,
        });
    }

    takeSnapshotIgnoringElements(name: string, selectorsToBlackout: string[]) {
        cy.compareSnapshot(name, {
            ...this.defaultSnapshotConfig,
            screenshotConfig: {
                blackout: selectorsToBlackout,
            },
        });
    }

    takeFlexibleSnapshot(name: string, threshold: number) {
        cy.compareSnapshot(name, {
            errorThreshold: threshold,
            capture: 'viewport',
        });
    }

    takeElementSnapshotFromChainable(elementChainable: Cypress.Chainable<JQuery<HTMLElement>>, name: string) {
        elementChainable.compareSnapshot(name, this.defaultSnapshotConfig);
    }

    takeMobileSnapshot(name: string) {
        cy.viewport('iphone-x');
        cy.wait(300);
        this.takeViewportSnapshot(name);
    }

    takeTabletSnapshot(name: string) {
        cy.viewport('ipad-2');
        cy.wait(300);
        this.takeViewportSnapshot(name);
    }

    takeDesktopSnapshot(name: string) {
        cy.viewport(1920, 1080);
        cy.wait(300);
        this.takeViewportSnapshot(name);
    }
}

export default new VisualTestingPage();