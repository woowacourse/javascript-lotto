export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'eslint-config-prettier'],
  plugins: ['prettier'],
  rules: {
    'class-methods-use-this': 'off',
    'import/extensions': 'off',
    'import/no-named-as-default': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'no-alert': 'off',
    'max-depth': ['error', 2],
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
};
