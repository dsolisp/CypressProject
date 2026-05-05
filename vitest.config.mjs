import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['cypress/pact/**/*.spec.ts'],
    passWithNoTests: false,
  },
});
