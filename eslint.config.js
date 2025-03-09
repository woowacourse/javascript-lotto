// eslint.config.js

import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['node_modules', 'dist'], // ESLint가 검사하지 않을 디렉토리

    plugins: {
      import: eslintPluginImport,
      prettier: eslintPluginPrettier
    },
    rules: {
      'prefer-const': 'error', // 변경되지 않는 변수는 const 사용
      'no-console': 'warn', // console.log 사용 시 경고
      eqeqeq: ['error', 'always'], // 일치 연산자(===) 사용 필수
      'no-unused-vars': ['warn', { args: 'none' }], // 사용하지 않는 변수 경고
      'no-duplicate-imports': 'error', // 중복 import 방지
      'no-shadow': 'error', // 변수명이 외부 스코프 변수와 중복 금지
      'no-multi-spaces': 'error', // 여러 개의 공백 금지
      'comma-dangle': ['error', 'never'], // 마지막 쉼표 금지
      'max-depth': ['error', 3], // 함수 중첩 최대 3단계 제한
      'max-params': ['error', 4], // 함수의 인자 최대 4개 제한
      curly: 'error', // 중괄호 사용 강제
      'consistent-return': 'error', // 함수에서 일관되게 return 사용
      'import/no-unresolved': 'error', // 존재하지 않는 모듈 import 방지
      'import/named': 'error' // 존재하지 않는 네임드 import 방지
    }
  }
];
