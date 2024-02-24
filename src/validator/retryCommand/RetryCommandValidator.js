import { startValidation } from '../startValidation.js';

import { deepFreeze } from '../../utils/object/object.js';

/**
 * @module RetryCommandValidator
 * @type {import('../../types/jsDoc.js').RetryCommandValidator}
 * 재시작 여부 입력에 대한 유효성 검사를 수행하는 모듈
 */
const RetryCommandValidator = deepFreeze({
  validationTypes: {
    /**
     * @type {import('../../types/jsDoc.js').RetryCommandValidationTypes}
     */
    isValidCommand: {
      errorMessage: 'y 또는 n만 입력 가능합니다. 다시 입력해주세요.',
      isValid(inputValue) {
        return /^[ynYN]$/.test(inputValue);
      },
    },
  },

  /**
   * 사용자의 입력 재시작 여부에 대한 유효성 검사 실행
   * @param {string} inputValue - 사용자의 입력 값
   * @returns {void}
   */
  check(inputValue) {
    startValidation(this.validationTypes, inputValue);
  },
});

export default RetryCommandValidator;
