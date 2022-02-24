{
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'airbnb-base', 'prettier'],
  parse: 'babel-parser',
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'no-plusplus': 'off',
    'class-methods-use-this': 'off',
    radix: 'off',
    'no-unused-vars': 'off',
    'no-restricted-properties': 'off',
    'max-depth': ['error', 2],
    'no-return-assign': 'off',
    'no-continue': 'off',
    'no-param-reassign': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
  },
};
