/**
 * VisualHelper — pure config builder + viewport setup for cypress-image-diff-js.
 *
 * Design contract (Law 2):
 *   This helper NEVER calls cy.compareSnapshot() — that is the assertion and
 *   belongs in the spec. VisualHelper only:
 *     1. Provides typed config objects that specs pass to cy.compareSnapshot().
 *     2. Provides setViewport() to resize the browser before a responsive capture.
 *
 * Usage in specs:
 *   cy.compareSnapshot('name', VisualHelper.viewportConfig);
 *   cy.compareSnapshot('name', VisualHelper.fullPageConfig);
 *   cy.compareSnapshot('name', VisualHelper.withBlackout(['.badge']));
 *   cy.compareSnapshot('name', VisualHelper.withThreshold(0.10));
 *   element.compareSnapshot('name', VisualHelper.viewportConfig);
 *   VisualHelper.setViewport('mobile');
 *   cy.compareSnapshot('name', VisualHelper.viewportConfig);
 */

export type VisualConfig = {
  errorThreshold: number;
  capture: 'fullPage' | 'viewport' | 'runner';
  screenshotConfig?: Record<string, unknown>;
};

type ViewportPreset = 'mobile' | 'tablet' | 'desktop' | 'laptop';

const VIEWPORT_PRESETS: Record<
  ViewportPreset,
  { width: number; height: number; device?: string }
> = {
  mobile: { width: 375, height: 812, device: 'iphone-x' },
  tablet: { width: 768, height: 1024, device: 'ipad-2' },
  desktop: { width: 1920, height: 1080 },
  laptop: { width: 1366, height: 768 },
};

const VisualHelper = {
  // ── Config objects (passed to cy.compareSnapshot() in the spec) ──────

  /** Default viewport config — 5% error threshold. */
  viewportConfig: { errorThreshold: 0.05, capture: 'viewport' } as VisualConfig,

  /** Full-page config — scrolls and stitches the entire document. */
  fullPageConfig: { errorThreshold: 0.05, capture: 'fullPage' } as VisualConfig,

  /**
   * Config that blacks out dynamic elements before capturing.
   * @param selectors CSS selectors of elements to blackout.
   */
  withBlackout(selectors: string[]): VisualConfig {
    return {
      errorThreshold: 0.05,
      capture: 'viewport',
      screenshotConfig: { blackout: selectors },
    };
  },

  /**
   * Config with a custom pixel-difference threshold (0.0 strict → 1.0 lenient).
   * @param threshold Fraction of pixels allowed to differ (e.g. 0.10 = 10%).
   */
  withThreshold(threshold: number): VisualConfig {
    return { errorThreshold: threshold, capture: 'viewport' };
  },

  // ── Setup action (no assertion — only changes browser state) ─────────

  /**
   * Resize the browser to a named preset and wait one frame for repaint.
   * Call this BEFORE cy.compareSnapshot() in the spec.
   */
  setViewport(preset: ViewportPreset): void {
    const vp = VIEWPORT_PRESETS[preset];
    if (vp.device) {
      cy.viewport(vp.device as Cypress.ViewportPreset);
    } else {
      cy.viewport(vp.width, vp.height);
    }
    cy.wait(300); // allow browser to repaint before capture
  },
};

export default VisualHelper;
