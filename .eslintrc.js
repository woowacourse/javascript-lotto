module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'eslint-config-prettier'],
  plugins: ['prettier'],
  rules: {
    'no-new': 'off',
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'import/no-named-as-default': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'no-alert': 'off',
    'max-depth': ['error', 2],
    'eol-last': ['error', 'always'],
    // "max-lines-per-function": ["error", 17],
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  ignorePatterns: ['cypress', '.eslintrc.js'],
};
