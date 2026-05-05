import { URLS } from '../support/constants';

/**
 * API Schema Validation Tests (Cypress)
 *
 * Formerly: contract.cy.ts
 * Equivalent to:
 * - Playwright: tests/backend/schema-validation.spec.ts
 * - Python: tests/backend/test_schema_validation.py
 */

describe('API Schema Validation @api @contract', () => {
  const SWAPI_BASE = URLS.SWAPI;

  it('should match expected schema for /people endpoint', () => {
    cy.request(`${SWAPI_BASE}/people/1/`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('height');
      expect(response.body).to.have.property('mass');
      expect(response.body).to.have.property('hair_color');
      expect(response.body).to.have.property('skin_color');
      expect(response.body).to.have.property('eye_color');
      expect(response.body).to.have.property('birth_year');
      expect(response.body).to.have.property('gender');
      expect(response.body).to.have.property('homeworld');
      expect(response.body).to.have.property('films');
      expect(response.body).to.have.property('species');
      expect(response.body).to.have.property('vehicles');
      expect(response.body).to.have.property('starships');
      expect(response.body).to.have.property('created');
      expect(response.body).to.have.property('edited');
      expect(response.body).to.have.property('url');
    });
  });

  it('should validate films endpoint schema', () => {
    cy.request(`${SWAPI_BASE}/films/1/`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('title');
      expect(response.body).to.have.property('episode_id');
      expect(response.body).to.have.property('opening_crawl');
      expect(response.body).to.have.property('director');
      expect(response.body).to.have.property('producer');
      expect(response.body).to.have.property('release_date');
      expect(response.body).to.have.property('characters').that.is.an('array');
      expect(response.body).to.have.property('planets').that.is.an('array');
      expect(response.body).to.have.property('starships').that.is.an('array');
      expect(response.body).to.have.property('vehicles').that.is.an('array');
      expect(response.body).to.have.property('species').that.is.an('array');
      expect(response.body).to.have.property('created');
      expect(response.body).to.have.property('edited');
      expect(response.body).to.have.property('url');
    });
  });

  it('should validate planets endpoint schema', () => {
    cy.request(`${SWAPI_BASE}/planets/1/`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('rotation_period');
      expect(response.body).to.have.property('orbital_period');
      expect(response.body).to.have.property('diameter');
      expect(response.body).to.have.property('climate');
      expect(response.body).to.have.property('gravity');
      expect(response.body).to.have.property('terrain');
      expect(response.body).to.have.property('surface_water');
      expect(response.body).to.have.property('population');
      expect(response.body).to.have.property('residents').that.is.an('array');
      expect(response.body).to.have.property('films').that.is.an('array');
    });
  });

  it('should ensure schema stability — required fields remain', () => {
    cy.request(`${SWAPI_BASE}/people/1/`).then((response) => {
      const requiredFields = [
        'name',
        'height',
        'mass',
        'hair_color',
        'skin_color',
        'eye_color',
        'birth_year',
        'gender',
      ];

      requiredFields.forEach((field) => {
        expect(response.body).to.have.property(field);
      });
    });
  });

  it('should validate array response structure for list endpoints', () => {
    cy.request(`${SWAPI_BASE}/people/`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('count').that.is.a('number');
      expect(response.body).to.have.property('next');
      expect(response.body).to.have.property('previous');
      expect(response.body).to.have.property('results').that.is.an('array');
      expect(response.body.results[0]).to.have.property('name');
      expect(response.body.results[0]).to.have.property('height');
    });
  });
});
