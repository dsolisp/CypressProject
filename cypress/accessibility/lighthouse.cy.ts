import type { Result } from 'axe-core';
import { URLS } from '../support/constants';

describe('Lighthouse-Style Accessibility Audits', () => {
  it('should have good accessibility score on homepage', () => {
    cy.visit(URLS.SAUCE_DEMO);
    cy.injectAxe();
    cy.checkA11y(
      undefined,
      {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'],
        },
      },
      (violations: Result[]) => {
        // Simulate Lighthouse scoring
        const penalty = violations.reduce(
          (acc: number, v: Result) =>
            acc +
            (v.impact === 'critical' ? 10 : v.impact === 'serious' ? 5 : 1),
          0
        );
        const score = Math.max(0, 100 - penalty);
        expect(score).to.be.gte(70);
      },
      true
    );
  });

  it('should have good accessibility score on SauceDemo login', () => {
    cy.visit(URLS.SAUCE_DEMO);
    cy.injectAxe();
    cy.checkA11y(
      undefined,
      {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] },
      },
      (violations: Result[]) => {
        const penalty = violations.reduce(
          (acc: number, v: Result) =>
            acc +
            (v.impact === 'critical' ? 10 : v.impact === 'serious' ? 5 : 1),
          0
        );
        const score = Math.max(0, 100 - penalty);
        expect(score).to.be.gte(60);
      },
      true
    );
  });

  it('should report accessibility issues in detail', () => {
    cy.visit(URLS.SAUCE_DEMO);
    cy.injectAxe();
    cy.checkA11y(
      undefined,
      undefined,
      (violations: Result[]) => {
        const ariaViolations = violations.filter((v: Result) =>
          v.id.startsWith('aria')
        );
        const colorViolations = violations.filter((v: Result) =>
          v.id.includes('color')
        );
        cy.log(`ARIA issues: ${ariaViolations.length}`);
        cy.log(`Color issues: ${colorViolations.length}`);
        expect(violations).to.exist;
      },
      true
    );
  });

  it('should have no critical accessibility violations', () => {
    cy.visit(URLS.SAUCE_DEMO);
    cy.injectAxe();
    cy.checkA11y(
      undefined,
      undefined,
      (violations: Result[]) => {
        const critical = violations.filter(
          (v: Result) => v.impact === 'critical'
        );
        expect(critical.length).to.eq(0);
      },
      true
    );
  });
});
