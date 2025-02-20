module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'max-depth': ['error', 1],
    'max-params': ['error', 2],
    'max-lines-per-function': ['error', { max: 15 }],
    'import/extensions': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'no-return-await': 'off',
    'no-console': 'off',
    'no-restricted-globals': 'off',
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
  },
};
