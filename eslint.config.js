import eslintPluginImport from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['node_modules', 'dist', 'build', 'src/cli/utils/readUserInput.js'], // 무시할 폴더
  },
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly', // node 환경 변수 사용
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
      },
    },
    plugins: {
      import: eslintPluginImport,
      prettier: prettierPlugin,
    },
    rules: {
      // 함수나 클래스의 매개변수를 2개까지만 허용
      'max-params': ['error', 2],

      // package import를 제외한 모든 import 구문에 대해 확장자를 사용하도록 강제
      'import/extensions': ['error', 'ignorePackages'],
      // 기타 사소한 오류 해결
      'import/prefer-default-export': 'off',
      'class-methods-use-this': 'off',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      // 들여쓰기 깊이 제한
      'max-depth': ['error', 2],
      // 함수의 길이 제한
      'max-lines-per-function': ['error', { max: 15 }],

      // ✅ Prettier 적용
      'prettier/prettier': 'error',
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  // ✅ Flat Config에서는 별도로 테스트 파일을 분리해야 함
  {
    files: ['*.test.js'], // .test.js 파일에 대한 설정
    rules: {
      'max-lines-per-function': ['error', { max: 15 }],
    },
    overrides: [
      {
        files: ['*.test.js'], // .test.js 파일 ESLint 적용 제외
        rules: {
          'max-lines-per-function': ['error', { max: 15 }],
        },
      },
    ],
  },
];
