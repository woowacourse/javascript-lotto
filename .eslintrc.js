module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:jsdoc/recommended', 'plugin:jest/recommended'],
  overrides: [
    {
      files: ['*.test.js', 'ApplicationTest.js', 'console.js', 'object.js'],
      rules: {
        'max-lines-per-function': ['off'],
      },
    },
    {
      files: ['*.config.js'],
      rules: {
        'import/no-extraneous-dependencies': ['off'],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-use-before-define': ['off'],
    'import/prefer-default-export': ['off'],
    'import/extensions': ['off'],
    // 들여쓰기 깊이 제한
    'max-depth': ['error', 1],
    // 함수 당 라인 수 제한
    'max-lines-per-function': ['error', { max: 10 }],
    // 함수 내 매개변수 갯수 제한
    'max-params': ['error', 2],
    'import/no-unresolved': ['off'],
    'class-methods-use-this': ['off'],
    'no-param-reassign': ['off'],
  },
};
