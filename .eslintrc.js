module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:lodash/recommended',
  ],
  plugins: [
    'react',
    'react-hooks',
    'lodash',
    '@typescript-eslint'
  ],
  env: {
    jest: true,
    browser: true,
    node: true,
  },
  rules: {
    quotes: [2, 'single', {
      avoidEscape: true,
    }],
    'comma-dangle': [2, 'always-multiline'],
    semi: ['error', 'always'],
    'react/jsx-uses-react': 'error',
    'react/jsx-filename-extension': [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
    'object-curly-newline': ['error', {
      ObjectPattern: 'never',
    }],
    'class-methods-use-this': ['error', {
      exceptMethods: [
        'render',
      ],
    }],
    'import/prefer-default-export': 'off',
    'no-restricted-imports': [
      'error',
      {
        paths: [{
          name: 'styled-components',
          message: 'Direct import of styled-components prohibited. Use styled-components/macro instead',
        }],
        patterns: [
          '!styled-components/macro',
        ],
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          [
            'builtin',
            'external',
            'internal',
          ],
        ],
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'lodash/import-scope': [2, 'member'],
    'lodash/prefer-lodash-method': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'js': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ]
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/extensions': [
      '.js',
      '.jsx',
    ],
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
};
