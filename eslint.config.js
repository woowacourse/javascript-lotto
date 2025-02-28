import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  pluginJs.configs.recommended,
  configPrettier,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },

    plugins: {
      prettier: pluginPrettier,
    },

    rules: {
      'no-var': 'error',
      'max-depth': ['error', 1],
      'max-params': ['error', 2],
      'operator-linebreak': ['error', 'before'],
      'no-unused-expressions': ['error', { allowTernary: false }],
      'import/prefer-default-export': 'off',
      'import/extensions': 'off',

      // Prettier 관련 설정 추가
      'prettier/prettier': 'error',
    },
  },
];
