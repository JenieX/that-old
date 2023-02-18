module.exports = {
  env: {
    node: true,
    commonjs: true,
    browser: true,
    es2021: true,
  },
  extends: [
    //
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:comment-length/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: {
    GM: 'readonly',
    unsafeWindow: 'readonly',
  },
  // ignorePatterns: ['temp.js', '**/vendor/*.js'],
  rules: {
    'no-console': 'off',
    'no-alert': 'off',
    'import/extensions': ['error', 'always'],
    'no-await-in-loop': 'off',
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'comment-length/limit-single-line-comments': [
      'off',
      {
        maxLength: 80,
        ignoreUrls: false,
      },
    ],
    'comment-length/limit-multi-line-comments': [
      'error',
      {
        maxLength: 80,
        ignoreUrls: false,
      },
    ],
    'no-use-before-define': ['error', { functions: false }],
  },
};
