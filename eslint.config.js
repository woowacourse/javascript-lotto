import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      'max-depth': ['error', 1], // 함수의 중첩 깊이 1단계까지만 허용
      'max-params': ['error', 2], // 함수의 매개변수 2개 이하만 허용
    },
  },
  pluginJs.configs.recommended,
];
