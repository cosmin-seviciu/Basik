import js from '@eslint/js';
import globals from 'globals';
export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.mjs'],
    ignores: ['**/*.test.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
    },
  },
];
