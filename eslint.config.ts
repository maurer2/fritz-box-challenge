// only used for react-hooks and compiler
import type { Linter } from 'eslint';
import tsParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  { ignores: ['src/routeTree.gen.ts', 'public/mockServiceWorker.js'] },
  {
    ...reactHooks.configs.flat.recommended,
    files: ['src/**/*.{ts,tsx}', 'scripts/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
] satisfies Linter.Config[];
