import BasePage from './BasePage';

class VisualTestingPage extends BasePage {
    private readonly defaultSnapshotConfig = {
        errorThreshold: 0.05,
        capture: 'viewport' as const,
    };

    private readonly VIEWPORT_PRESETS = {
        mobile: { width: 375, height: 812, device: 'iphone-x' as const },
        tablet: { width: 768, height: 1024, device: 'ipad-2' as const },
        desktop: { width: 1920, height: 1080 },
        laptop: { width: 1366, height: 768 },
    } as const;

    constructor() {
        super();
    }

    captureFullPage(name: string, customConfig?: any) {
        cy.compareSnapshot(name, {
            ...this.defaultSnapshotConfig,
            capture: 'fullPage',
            ...customConfig,
        });
    }

    captureViewport(name: string, customConfig?: any) {
        cy.compareSnapshot(name, {
            ...this.defaultSnapshotConfig,
            ...customConfig,
        });
    }

    captureWithBlackout(name: string, selectorsToBlackout: string[]) {
        cy.compareSnapshot(name, {
            ...this.defaultSnapshotConfig,
            screenshotConfig: {
                blackout: selectorsToBlackout,
            },
        });
    }

    captureWithThreshold(name: string, threshold: number) {
        cy.compareSnapshot(name, {
            errorThreshold: threshold,
            capture: 'viewport',
        });
    }

    captureElement(elementChainable: Cypress.Chainable<JQuery<HTMLElement>>, name: string) {
        elementChainable.compareSnapshot(name, this.defaultSnapshotConfig);
    }

    captureAtViewport(name: string, preset: keyof typeof this.VIEWPORT_PRESETS, customConfig?: any) {
        const viewport = this.VIEWPORT_PRESETS[preset];

        if ('device' in viewport && viewport.device) {
            cy.viewport(viewport.device);
        } else {
            cy.viewport(viewport.width, viewport.height);
        }

        cy.wait(300);
        this.captureViewport(name, customConfig);
    }
}

export default new VisualTestingPage();