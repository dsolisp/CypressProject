describe('SWAPI - Comprehensive API Tests', () => {
    const BASE_URL = 'https://swapi.dev/api';

    // Example 1: Basic GET Request (Positive)
    it('Example 1: Fetches a specific person (Luke Skywalker)', () => {
        cy.request(`${BASE_URL}/people/1`).then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('name');
            expect(res.body.name).to.equal('Luke Skywalker');
            expect(res.body).to.have.property('height');
            expect(res.body.height).to.equal('172');
        });
    });

    // Example 2: Collection & Pagination (Positive)
    it('Example 2: Fetches a collection of people with pagination', () => {
        cy.request(`${BASE_URL}/people`).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.count).to.be.greaterThan(0);
            expect(res.body.next).to.not.be.null; // People has 82+ results, so next exists
            expect(res.body.previous).to.be.null;

            // Verify structure of first item
            expect(res.body.results[0]).to.have.property('name');
            expect(res.body.results[0]).to.have.property('gender');
        });
    });

    // Example 3: Query Parameters (Search)
    it('Example 3: Fetches a person using search query', () => {
        cy.request(`${BASE_URL}/people?search=Darth Vader`).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.count).to.eq(1);
            expect(res.body.results[0].name).to.eq('Darth Vader');
        });
    });

    // Example 4: Schema Validation (Structure)
    it('Example 4: Validates starship resource schema', () => {
        cy.request(`${BASE_URL}/starships/9`).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body).to.have.all.keys(
                'name', 'model', 'manufacturer', 'cost_in_credits', 'length',
                'max_atmosphering_speed', 'crew', 'passengers', 'cargo_capacity',
                'consumables', 'hyperdrive_rating', 'MGLT', 'starship_class',
                'pilots', 'films', 'created', 'edited', 'url'
            );
        });
    });

    // Example 5: Performance Assertion (SLA)
    it('Example 5: Verifies response time is under 500ms', () => {
        const start = Date.now();
        cy.request(`${BASE_URL}/planets/1`).then((res) => {
            const responseTime = Date.now() - start;
            expect(responseTime).to.be.lessThan(500); // SLA check
        });
    });

    // Example 6: Invalid Resource ID (Negative)
    it('Example 6: Verifies 404 for non-existent ID', () => {
        cy.request({
            url: `${BASE_URL}/people/99999`,
            failOnStatusCode: false // Critical for negative testing
        }).then((res) => {
            expect(res.status).to.eq(404);
            expect(res.body.detail).to.eq('Not found');
        });
    });

    // Example 7: Invalid Endpoint (Negative)
    it('Example 7: Verifies 404 for invalid endpoint', () => {
        cy.request({
            url: `${BASE_URL}/invalid_endpoint`,
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.eq(404);
        });
    });

    // Example 8: No Results (Negative)
    it('Example 8: Handles search with no matches', () => {
        cy.request(`${BASE_URL}/people?search=xyz_no_match`).then((res) => {
            expect(res.status).to.eq(200); // SWAPI returns 200 with 0 results
            expect(res.body.count).to.eq(0);
            expect(res.body.results).to.be.empty;
        });
    });

    // ⚠️ BOUNDARY TESTS (Edge Cases)

    // Example 9: Pagination Boundary (First Page)
    it('Example 9: Verifies pagination logic (First Page)', () => {
        cy.request(`${BASE_URL}/people?page=1`).then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.previous).to.be.null; // No previous page
            expect(res.body.next).to.not.be.null; // Has next page
        });
    });

    // Example 10: Pagination Boundary (Last Page)
    it('Example 10: Verifies pagination logic (Last Page)', () => {
        cy.request(`${BASE_URL}/people`).then((res) => {
            const totalPages = Math.ceil(res.body.count / res.body.results.length);

            cy.request(`${BASE_URL}/people?page=${totalPages}`).then((lastPage) => {
                expect(lastPage.status).to.eq(200);
                expect(lastPage.body.next).to.be.null; // No next page
            });
        });
    });
}); 