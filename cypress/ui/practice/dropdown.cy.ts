import DropdownPage from '../../pages/practice/dropdown.page';

/**
 * ADV-E1 — Static dropdown
 * ADV-E2 — Dynamic dropdown (async options with 1.5 s simulated delay)
 */
describe('Practice App — Dropdown @practice @smoke', () => {
  beforeEach(() => {
    DropdownPage.openDropdownPage();
  });

  // ── ADV-E1: Static dropdown ──────────────────────────────────────────
  describe('ADV-E1: Static dropdown', () => {
    it('should show the static dropdown on page load', () => {
      DropdownPage.getStaticDropdown().should('be.visible');
    });

    it('should select Option 1 and update the status', () => {
      DropdownPage.selectStatic('1');
      DropdownPage.getStaticStatus().should('contain', 'Option 1');
    });

    it('should select Option 2 and update the status', () => {
      DropdownPage.selectStatic('2');
      DropdownPage.getStaticStatus().should('contain', 'Option 2');
    });

    it('should select Option 3 and update the status', () => {
      DropdownPage.selectStatic('3');
      DropdownPage.getStaticStatus().should('contain', 'Option 3');
    });
  });

  // ── ADV-E2: Dynamic dropdown ─────────────────────────────────────────
  describe('ADV-E2: Dynamic dropdown (async load)', () => {
    it('should start disabled while loading', () => {
      DropdownPage.getDynamicDropdown().should('be.disabled');
      DropdownPage.getDynamicStatus().should('contain', 'Fetching');
    });

    it('should become enabled and show options after async load', () => {
      // Dynamic options load after ~1.5 s — Cypress auto-waits up to 4 s
      DropdownPage.getDynamicDropdown().should('not.be.disabled');
      DropdownPage.getDynamicStatus().should('contain', 'loaded');
    });

    it('should select a dynamic option after load and update status', () => {
      DropdownPage.selectDynamic('1');
      DropdownPage.getDynamicStatus().should('not.contain', 'Fetching');
    });
  });
});
