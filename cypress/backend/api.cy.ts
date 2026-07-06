import { URLS } from '../support/constants';

/**
 * SWAPI — Comprehensive API Tests (Gold Standard).
 * Pure cy.request() tests — no page objects needed for API specs.
 * Covers: positive, negative, schema validation, SLA, and pagination.
 */

interface SwapiListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

interface SwapiPerson {
  name: string;
  height: string;
  gender: string;
}

interface SwapiStarship {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

describe('SWAPI — Comprehensive API Tests @api', () => {
  const BASE_URL = URLS.SWAPI;

  // ── Positive Tests ──────────────────────────────────────────────────
  it('Example 1: Fetches a specific person (Luke Skywalker)', () => {
    cy.request(`${BASE_URL}/people/1`).then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('name');
      expect(res.body.name).to.equal('Luke Skywalker');
      expect(res.body.height).to.equal('172');
    });
  });

  it('Example 2: Fetches a paginated collection of people', () => {
    cy.request(`${BASE_URL}/people`).then((res) => {
      const body = res.body as SwapiListResponse<SwapiPerson>;
      expect(res.status).to.eq(200);
      expect(body.count).to.be.greaterThan(0);
      expect(body.next).to.not.be.null;
      expect(body.previous).to.be.null;
      expect(body.results[0]).to.have.property('name');
      expect(body.results[0]).to.have.property('gender');
    });
  });

  it('Example 3: Fetches a person using search query', () => {
    cy.request(`${BASE_URL}/people?search=Darth Vader`).then((res) => {
      const body = res.body as SwapiListResponse<SwapiPerson>;
      expect(res.status).to.eq(200);
      expect(body.count).to.eq(1);
      expect(body.results[0].name).to.eq('Darth Vader');
    });
  });

  // ── Schema Validation ───────────────────────────────────────────────
  it('Example 4: Validates starship resource schema', () => {
    cy.request(`${BASE_URL}/starships/9`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body as SwapiStarship).to.have.all.keys(
        'name',
        'model',
        'manufacturer',
        'cost_in_credits',
        'length',
        'max_atmosphering_speed',
        'crew',
        'passengers',
        'cargo_capacity',
        'consumables',
        'hyperdrive_rating',
        'MGLT',
        'starship_class',
        'pilots',
        'films',
        'created',
        'edited',
        'url'
      );
    });
  });

  // ── SLA / Performance ───────────────────────────────────────────────
  it('Example 5: Verifies response time is under 3000ms (external API)', () => {
    const start = Date.now();
    cy.request(`${BASE_URL}/planets/1`).then(() => {
      expect(Date.now() - start).to.be.lessThan(3000);
    });
  });

  // ── Negative Tests ──────────────────────────────────────────────────
  it('Example 6: Verifies 404 for non-existent resource ID', () => {
    cy.request({
      url: `${BASE_URL}/people/99999`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
      expect(res.body.detail).to.contain('Not found');
    });
  });

  it('Example 7: Verifies 404 for invalid endpoint', () => {
    cy.request({
      url: `${BASE_URL}/invalid_endpoint`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404);
    });
  });

  it('Example 8: Handles search with no matches', () => {
    cy.request(`${BASE_URL}/people?search=xyz_no_match`).then((res) => {
      const body = res.body as SwapiListResponse<SwapiPerson>;
      expect(res.status).to.eq(200);
      expect(body.count).to.eq(0);
      expect(body.results).to.be.empty;
    });
  });

  // ── Pagination Boundary ─────────────────────────────────────────────
  it('Example 9: Verifies first page has no previous link', () => {
    cy.request(`${BASE_URL}/people?page=1`).then((res) => {
      const body = res.body as SwapiListResponse<SwapiPerson>;
      expect(res.status).to.eq(200);
      expect(body.previous).to.be.null;
      expect(body.next).to.not.be.null;
    });
  });

  it('Example 10: Verifies last page has no next link', () => {
    cy.request(`${BASE_URL}/people`).then((res) => {
      const body = res.body as SwapiListResponse<SwapiPerson>;
      const totalPages = Math.ceil(body.count / body.results.length);
      cy.request(`${BASE_URL}/people?page=${totalPages}`).then((lastPage) => {
        const lastBody = lastPage.body as SwapiListResponse<SwapiPerson>;
        expect(lastPage.status).to.eq(200);
        expect(lastBody.next).to.be.null;
      });
    });
  });
});
