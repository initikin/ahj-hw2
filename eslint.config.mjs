import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist/**', 'coverage/**', 'node_modules/**'] },
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.test.js'],
    languageOptions: { globals: { ...globals.browser, ...globals.jest } },
  },
];
