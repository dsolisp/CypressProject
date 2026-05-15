/**
 * Google Lighthouse scores via @cypress-audit/lighthouse (separate config).
 * Thresholds are intentionally loose — this job is a spike / signal, not a gate.
 */
/// <reference path="../../node_modules/@cypress-audit/lighthouse/index.d.ts" />
describe('optional Lighthouse CLI-backed audit', () => {
  it('runs Lighthouse on SauceDemo login', () => {
    cy.visit('/');
    cy.lighthouse(
      {
        performance: 5,
        accessibility: 70,
        'best-practices': 40,
        seo: 40,
      },
      { formFactor: 'desktop', screenEmulation: { disabled: true } }
    );
  });
});
