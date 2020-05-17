module.exports = {
  // processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-styled-components',
    'stylelint-config-rational-order',
  ],
  syntax: 'css-in-js',
  rules: {
    'block-closing-brace-newline-before': 'always',
    'at-rule-no-unknown': null,
    'order/properties-order': [],
    'plugin/rational-order': [
      true,
      {
        'border-in-box-model': true,
        'empty-line-between-groups': false,
      },
    ],
    'no-invalid-double-slash-comments': null,
    'declaration-empty-line-before': [
      null,
      {
        ignore: ['after-comment', 'after-declaration', 'first-nested', 'inside-single-line-block'],
      },
    ],
    'value-keyword-case': null,
  },
  ignoreFiles: ['node_modules', '.lintstagedrc'],
};
