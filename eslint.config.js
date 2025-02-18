import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginJest from 'eslint-plugin-jest';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Node.js 환경도 고려 (선택 사항)
        ...globals.jest, // Jest 글로벌 변수 추가
      },
    },
    plugins: ['jest'],
    extends: ['plugin:jest/recommended'],
    rules: {
      'max-depth': ['error', 1], // 함수의 중첩 깊이 1단계까지만 허용
      'max-params': ['error', 2], // 함수의 매개변수 2개 이하만 허용
    },
  },
];
