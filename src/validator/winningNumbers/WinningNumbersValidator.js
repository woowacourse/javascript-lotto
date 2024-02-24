import Lotto from '../../domain/Lotto/Lotto.js';

import { startValidation } from '../startValidation.js';

import { SYMBOLS } from '../../constants/symbols.js';
import { INPUT_LOTTO_NUMBER_REGEXP } from '../../constants/regexp.js';

import { deepFreeze } from '../../utils/object/object.js';

const { LOTTO_RULE } = Lotto;

/**
 * @module WinningNumberValidator
 * @type {import('../../types/jsDoc.js').WinningNumberValidator}
 * 당첨 번호 입력에 대한 유효성 검사를 수행하는 모듈
 */
const WinningNumbersValidator = deepFreeze({
  /**
   * @type {import('../../types/jsDoc.js').WinningNumberValidationTypes}
   */
  validationTypes: {
    isValidType: {
      errorMessage: '당첨 번호 입력의 형식이 올바르지 않습니다. 다시 입력해주세요.',
      isValid(inputValue) {
        return INPUT_LOTTO_NUMBER_REGEXP.test(inputValue);
      },
    },

    isValidLength: {
      errorMessage: `당첨 번호는 ${LOTTO_RULE.count}개여야 합니다. 다시 입력해주세요.`,
      isValid(inputValue) {
        const numbers = inputValue.split(SYMBOLS.comma).map(Number);
        return numbers.length === LOTTO_RULE.count;
      },
    },

    isValidRange: {
      errorMessage: `당첨 번호는 ${LOTTO_RULE.min} ~ ${LOTTO_RULE.max} 사이의 자연수여야 합니다. 다시 입력해주세요.`,
      isValid(inputValue) {
        const numbers = inputValue.split(SYMBOLS.comma).map(Number);
        return numbers.every((number) => number >= LOTTO_RULE.min && number <= LOTTO_RULE.max);
      },
    },

    isUnique: {
      errorMessage: '당첨 번호는 서로 중복되지 않아야 합니다. 다시 입력해주세요.',
      isValid(inputValue) {
        const winningNumbers = inputValue.split(SYMBOLS.comma).map(Number);
        const uniqueWinningNumber = new Set(winningNumbers);

        return uniqueWinningNumber.size === winningNumbers.length;
      },
    },
  },

  /**
   * 사용자의 입력 당첨 번호에 대한 유효성 검사 실행
   * @param {string} inputValue - 사용자의 입력 값
   * @returns {void}
   */
  check(inputValue) {
    startValidation(this.validationTypes, inputValue);
  },
});

export default WinningNumbersValidator;
