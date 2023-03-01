module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': ['off'],
    'class-methods-use-this': 'off',
    'no-alert': 'off',
    'no-undef': 'off',
    'no-new': 'off',
    'lines-between-class-members': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'import/no-import-module-exports': 'off',
    'no-console': 'off',
    'import/no-unresolved': 'off',
  },
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
};
