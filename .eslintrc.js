module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
  },
  extends: ['tui', 'prettier'],
  parserOptions: {
    sourceType: 'module',
    /** spread eslint error  */
    ecmaVersion: '13',
  },
  rules: {
    'no-var': 'error',
    'max-depth': ['error', 2],
    'max-lines-per-function': ['error', 15],
    'no-console': 'warn',
    'no-param-reassign': 'error',
    'padding-line-between-statements': 0,
    'newline-before-return': 0,
    'no-undefined': 0,
    'no-constant-condition': 0,
    'no-unused-private-class-members': 0,
  },
};
