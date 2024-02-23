import { startValidation } from '../startValidation.js';

import { SYMBOLS } from '../../constants/symbols.js';

import { deepFreeze } from '../../utils/object/object.js';

/**
 * @module CommonValidator
 * @type {import('../../types/jsDoc.js').CommonValidator}
 * 입력 값에 대한 일반적인 유효성 검사를 수행하는 모듈
 */
const CommonValidator = deepFreeze({
  /**
   * @type {import('../../types/jsDoc.js').CommonValidationTypes}
   */
  validationTypes: {
    emptyValues: {
      errorMessage: '입력값이 존재하지 않습니다. 다시 입력해 주세요.',
      isValid(inputValue) {
        return inputValue !== SYMBOLS.emptyString;
      },
    },
  },

  /**
   * @param {string} inputValue - 사용자의 입력 값
   * @throws {import('../../errors/AppError/AppError.js').default} 유효성을 만족하지 않을 경우 에러 발생
   * @returns {void}
   */
  check(inputValue) {
    startValidation(this.validationTypes, inputValue);
  },
});

export default CommonValidator;
