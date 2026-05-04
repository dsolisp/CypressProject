import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import cypressPlugin from 'eslint-plugin-cypress';
import globals from 'globals';

export default [
  // ── Global ignores ────────────────────────────────────────────────
  {
    ignores: [
      'node_modules/**',
      'cypress-image-diff-screenshots/**',
      'cypress-image-diff-html-report/**',
      'cypress/screenshots/**',
      'cypress/videos/**',
    ],
  },

  // ── TypeScript files ──────────────────────────────────────────────
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      globals: { ...globals.node, ...globals.browser },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      cypress: cypressPlugin,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // ── JS config/tool files ──────────────────────────────────────────
  {
    files: ['*.js', '*.cjs'],
    ...eslint.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },

  // ── JS Cypress spec files — needs Cypress globals ─────────────────
  {
    files: ['cypress/e2e/**/*.cy.js'],
    plugins: { cypress: cypressPlugin },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        cy: 'readonly',
        Cypress: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        before: 'readonly',
        beforeEach: 'readonly',
        after: 'readonly',
        afterEach: 'readonly',
        expect: 'readonly',
        context: 'readonly',
        assert: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
  },

  // ── Law 2: No assertions in page objects ─────────────────────────
  // ── Law 2: No assertions in any page object ──────────────────────────
  {
    files: ['cypress/pages/**/*.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'CallExpression[callee.property.name="should"]',
          message: '❌ Law 2: No assertions in pages. Return chainables; let specs assert.',
        },
        {
          selector: 'CallExpression[callee.property.name="expect"]',
          message: '❌ Law 2: No assertions in pages. Return chainables; let specs assert.',
        },
      ],
    },
  },

  // ── Law 2: No assertions in locator files ────────────────────────
  {
    files: ['cypress/locators/**/*.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'CallExpression[callee.property.name="should"]',
          message: '❌ Law 2: No assertions in locators.',
        },
      ],
    },
  },

  // ── Law 3: No raw selectors in UI spec files (API/DB specs excluded) ──
  {
    files: ['cypress/e2e/ui/**/*.cy.{ts,js}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'CallExpression[callee.object.name="cy"][callee.property.name=/^(get|find|contains)$/]',
          message: '❌ Law 3: No raw cy.get/find/contains in specs. Use page object methods.',
        },
      ],
    },
  },
];
