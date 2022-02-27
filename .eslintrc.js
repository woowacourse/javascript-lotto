module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'max-depth': [1, 2],
    'max-lines-per-function': [1, 15],
    'spaced-comment': [2, 'always'],
    'no-new': 'off',
    'no-alert': 'off',
    'no-console': 'off',
    'no-plusplus': 'off',
  },
};
