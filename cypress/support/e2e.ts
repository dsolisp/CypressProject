// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Core commands and auth helpers (ADR-009)
import './commands';

// Header component commands (ADR-005 Cypress idiom)
import './commands/header';

// Visual regression snapshot command
import compareSnapshotCommand from 'cypress-image-diff-js/command';
compareSnapshotCommand();
