/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command from cypress-image-diff-js to compare visual snapshots
             * @param name - Name of the screenshot/snapshot
             * @param options - Configuration options for snapshot comparison
             */
            compareSnapshot(name: string, options?: {
                errorThreshold?: number;
                capture?: 'fullPage' | 'viewport' | 'runner';
                screenshotConfig?: any;
            }): Chainable<any>;
        }
    }
}

// Make this file a module to allow global augmentation
export { };