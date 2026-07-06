import DropdownPage from '../../pages/practice/dropdown.page';
import { softly } from '../../support/soft-assert';

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
      // Soft assertions collect both failures and report them together,
      // mirroring the Java SoftAssertions / Playwright expect.soft pattern.
      DropdownPage.getDynamicDropdown().then(($dropdown) => {
        DropdownPage.getDynamicStatus().then(($status) => {
          softly((s) => {
            s.check(
              $dropdown.is(':disabled'),
              'dynamic dropdown should be disabled while options load'
            );
            s.contains(
              $status.text(),
              'Fetching',
              "status should contain 'Fetching' while loading"
            );
          });
        });
      });
    });

    it('should become enabled and show options after async load', () => {
      // Dynamic options load after ~1.5 s — Cypress auto-waits up to 4 s
      DropdownPage.getDynamicDropdown().should('not.be.disabled');
      DropdownPage.getDynamicStatus().should('contain', 'loaded');
    });

    it('should select a dynamic option after load and update status', () => {
      // API returns option values: selenium, playwright, cypress, appium
      DropdownPage.selectDynamic('selenium');
      DropdownPage.getDynamicStatus().should('not.contain', 'Fetching');
    });
  });
});
