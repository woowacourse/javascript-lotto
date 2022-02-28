module.exports = {
  env: {
    browser: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'import/extensions': ['error', 'ignorePackages', { js: 'always' }],
    'no-alert': 'off',
    'prefer-destructuring': ['error', { object: false, array: false }],
    'class-methods-use-this': 'off',
  },
};
