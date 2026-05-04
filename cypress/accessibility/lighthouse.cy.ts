describe('Lighthouse-Style Accessibility Audits', () => {
  it('should have good accessibility score on Bing homepage', () => {
    cy.visit('https://www.bing.com');
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'] }
    }, (violations) => {
      // Simulate Lighthouse scoring
      const penalty = violations.reduce((acc, v) => acc + (v.impact === 'critical' ? 10 : v.impact === 'serious' ? 5 : 1), 0);
      const score = Math.max(0, 100 - penalty);
      expect(score).to.be.gte(70);
    }, true);
  });

  it('should have good accessibility score on SauceDemo login', () => {
    cy.visit('https://www.saucedemo.com');
    cy.injectAxe();
    cy.checkA11y(null, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa'] }
    }, (violations) => {
      const penalty = violations.reduce((acc, v) => acc + (v.impact === 'critical' ? 10 : v.impact === 'serious' ? 5 : 1), 0);
      const score = Math.max(0, 100 - penalty);
      expect(score).to.be.gte(60);
    }, true);
  });

  it('should report accessibility issues in detail', () => {
    cy.visit('https://www.bing.com');
    cy.injectAxe();
    cy.checkA11y(null, null, (violations) => {
      const ariaViolations = violations.filter(v => v.id.startsWith('aria'));
      const colorViolations = violations.filter(v => v.id.includes('color'));
      cy.log(`ARIA issues: ${ariaViolations.length}`);
      cy.log(`Color issues: ${colorViolations.length}`);
      expect(violations).to.exist;
    }, true);
  });

  it('should have no critical accessibility violations', () => {
    cy.visit('https://www.bing.com');
    cy.injectAxe();
    cy.checkA11y(null, null, (violations) => {
      const critical = violations.filter(v => v.impact === 'critical');
      expect(critical.length).to.eq(0);
    }, true);
  });
});
