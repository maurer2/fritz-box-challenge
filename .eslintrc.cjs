module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'prettier',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'class-methods-use-this': [
      'error',
      {
        exceptMethods: ['render'],
      },
    ],
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], ['internal', 'parent'], ['sibling'], ['index']],
        'newlines-between': 'always',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/prop-types': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/function-component-definition': 'off',
    'no-console': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    // Ignore vite's import suffixes (?raw, ?url, ?inline)
    'import/no-unresolved': ['error', { ignore: ['\\?(raw|url|inline)$'] }],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mts', 'cjs', 'mjs'],
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
        alwaysTryTypes: true,
      },
      node: true,
    },
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  overrides: [
    {
      files: ['./scripts/**/*.ts'],
      rules: {
        // force .ts file ending for relative imports for scripts
        'import/extensions': [
          'error',
          'ignorePackages', // only relative imports
          { js: 'never', jsx: 'never', ts: 'always', tsx: 'never' },
        ],
      },
    },
  ],
};
