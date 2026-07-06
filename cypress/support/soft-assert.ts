/**
 * Dependency-free soft assertions for Cypress specs.
 *
 * Mirrors the Java SoftAssertions, Playwright expect.soft, and C#
 * FluentAssertions AssertionScope patterns: every check runs even if an
 * earlier one failed, and all failures are reported together instead of
 * stopping at the first.
 *
 * Use inside a `.then()` callback once the values under test are resolved:
 *
 *   DropdownPage.getDynamicStatus().then(($status) => {
 *     softly((s) => {
 *       s.check($status.is(':disabled'), 'dropdown should be disabled');
 *       s.contains($status.text(), 'Fetching');
 *     });
 *   });
 */
export class SoftAssert {
  private readonly failures: string[] = [];

  /** Record a failure when `condition` is falsy. */
  check(condition: boolean, message = 'assertion failed'): this {
    if (!condition) {
      this.failures.push(message);
    }
    return this;
  }

  /** Record a failure when `actual` does not strictly equal `expected`. */
  equal(actual: unknown, expected: unknown, message?: string): this {
    if (actual !== expected) {
      this.failures.push(
        message ?? `expected ${String(expected)} but was ${String(actual)}`
      );
    }
    return this;
  }

  /** Record a failure when `haystack` does not contain `needle`. */
  contains(haystack: string, needle: string, message?: string): this {
    if (!haystack.includes(needle)) {
      this.failures.push(
        message ?? `expected "${haystack}" to contain "${needle}"`
      );
    }
    return this;
  }

  /** Record a failure when `haystack` contains `needle`. */
  notContains(haystack: string, needle: string, message?: string): this {
    if (haystack.includes(needle)) {
      this.failures.push(
        message ?? `expected "${haystack}" not to contain "${needle}"`
      );
    }
    return this;
  }

  /** Throw a single aggregated error if any soft assertion failed. */
  assertAll(): void {
    if (this.failures.length > 0) {
      const lines = this.failures.map((failure) => `  - ${failure}`).join('\n');
      throw new Error(
        `${this.failures.length} soft assertion(s) failed:\n${lines}`
      );
    }
  }
}

/**
 * Run `assertions` against a fresh {@link SoftAssert}, then raise any collected
 * failures together. Mirrors the C# `AssertAll(Action)` block.
 */
export function softly(assertions: (soft: SoftAssert) => void): void {
  const soft = new SoftAssert();
  assertions(soft);
  soft.assertAll();
}
