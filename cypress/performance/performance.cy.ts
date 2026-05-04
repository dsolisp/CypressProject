import LoginPage from '../pages/sauce/login.page';

describe('Performance Tests', () => {
  describe('Page Load Performance', () => {
    it('homepage should load within acceptable time', () => {
      const startTime = Date.now();
      cy.visit('https://www.bing.com').then(() => {
        const loadTime = Date.now() - startTime;
        cy.log(`Homepage load time: ${loadTime}ms`);
        expect(loadTime).to.be.lessThan(10000);
      });
    });

    it('SauceDemo login page should load quickly', () => {
      const startTime = Date.now();
      cy.visit('https://www.saucedemo.com').then(() => {
        const loadTime = Date.now() - startTime;
        cy.log(`SauceDemo load time: ${loadTime}ms`);
        expect(loadTime).to.be.lessThan(3000);
      });
    });
  });

  describe('Core Web Vitals', () => {
    it('should measure Largest Contentful Paint (LCP)', () => {
      cy.visit('https://www.saucedemo.com', {
        onBeforeLoad(win) {
          win.performance.mark('start');
        }
      });
      cy.window().then((win) => {
        return new Cypress.Promise((resolve) => {
          new win.PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            resolve(lastEntry.startTime);
          }).observe({ type: 'largest-contentful-paint', buffered: true });
          setTimeout(() => resolve(-1), 5000);
        });
      }).then((lcp) => {
        cy.log(`LCP: ${lcp}ms`);
        if (lcp > 0) {
          expect(lcp).to.be.lessThan(2500);
        }
      });
    });

    it('should measure First Contentful Paint (FCP)', () => {
      cy.visit('https://www.saucedemo.com');
      cy.window().then((win) => {
        const paintEntries = win.performance.getEntriesByType('paint');
        const fcpEntry = paintEntries.find((e: any) => e.name === 'first-contentful-paint');
        const fcp = fcpEntry ? fcpEntry.startTime : -1;
        cy.log(`FCP: ${fcp}ms`);
        if (fcp > 0) {
          expect(fcp).to.be.lessThan(1800);
        }
      });
    });

    it('should measure Time to Interactive approximation', () => {
      const startTime = Date.now();
      LoginPage.openLoginPage();
      cy.get('#login-button').should('be.visible').then(() => {
        const tti = Date.now() - startTime;
        cy.log(`Time to Interactive (approx): ${tti}ms`);
        expect(tti).to.be.lessThan(5000);
      });
    });
  });

  describe('API Performance', () => {
    const apiBaseUrl = 'https://jsonplaceholder.typicode.com';

    it('API responses should be fast', () => {
      const startTime = Date.now();
      cy.request(`${apiBaseUrl}/posts`).then((response) => {
        const responseTime = Date.now() - startTime;
        cy.log(`API response time: ${responseTime}ms`);
        expect(response.status).to.eq(200);
        expect(responseTime).to.be.lessThan(2000);
      });
    });

    it('concurrent API requests should be fast', () => {
      const startTime = Date.now();
      const endpoints = ['/posts/1', '/posts/2', '/posts/3', '/users/1', '/comments?postId=1'];

      const promises = endpoints.map(ep => cy.request(`${apiBaseUrl}${ep}`));

      Cypress.Promise.all(promises).then((responses) => {
        const totalTime = Date.now() - startTime;
        cy.log(`Concurrent requests time: ${totalTime}ms`);
        responses.forEach((r: any) => expect(r.status).to.eq(200));
        expect(totalTime).to.be.lessThan(3000);
      });
    });
  });

  describe('Resource Loading', () => {
    it('should not have excessive resource size', () => {
      cy.visit('https://www.saucedemo.com');
      cy.window().then((win) => {
        const resources = win.performance.getEntriesByType('resource');
        const totalSize = resources.reduce((sum, r: any) => sum + (r.transferSize || 0), 0);
        const totalSizeKB = Math.round(totalSize / 1024);
        cy.log(`Total resource size: ${totalSizeKB}KB`);
        expect(totalSize).to.be.lessThan(2 * 1024 * 1024);
      });
    });
  });
});
