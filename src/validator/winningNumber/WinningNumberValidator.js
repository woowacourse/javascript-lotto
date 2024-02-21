import { startValidation } from '../startValidation.js';
import { deepFreeze } from '../../utils/object/object.js';
import { SYMBOLS } from '../../constants/symbols.js';
import Lotto from '../../domain/Lotto/Lotto.js';

/**
 * @module WinningNumberValidator
 * @type {import('../../types/jsDoc.js').WinningNumberValidator}
 * 당첨 번호 입력에 대한 유효성 검사를 수행하는 모듈
 */
const WinningNumberValidator = deepFreeze({
  /**
   * @type {import('../../types/jsDoc.js').WinningNumberValidationTypes}
   */
  validationTypes: {
    isValidType: {
      errorMessage: '당첨 번호 입력의 형식이 올바르지 않습니다. 다시 입력해주세요.',
      isValid(inputValue) {
        return /^([1-9]\d?)(,[1-9]\d?)*$/.test(inputValue);
      },
    },

    isValidLength: {
      errorMessage: `당첨 번호는 ${Lotto.LOTTO_DETAILS.count}개여야 합니다. 다시 입력해주세요.`,
      isValid(inputValue) {
        const numbers = inputValue.split(SYMBOLS.comma).map(Number);
        return numbers.length === Lotto.LOTTO_DETAILS.count;
      },
    },

    isValidRange: {
      errorMessage: `당첨 번호는 ${Lotto.LOTTO_DETAILS.min} ~ ${Lotto.LOTTO_DETAILS.max} 사이의 자연수여야 합니다. 다시 입력해주세요.`,
      isValid(inputValue) {
        const numbers = inputValue.split(SYMBOLS.comma).map(Number);
        return numbers.every(
          (number) => number >= Lotto.LOTTO_DETAILS.min && number <= Lotto.LOTTO_DETAILS.max,
        );
      },
    },

    isUnique: {
      errorMessage: '당첨 번호는 서로 중복되지 않아야 합니다. 다시 입력해주세요.',
      isValid(inputValue) {
        const numbers = inputValue.split(SYMBOLS.comma).map(Number);
        const uniqueNumbers = new Set(numbers);

        return uniqueNumbers.size === numbers.length;
      },
    },
  },

  /**
   * 사용자의 입력 당첨 번호에 대한 유효성 검사 실행
   * @param {string} inputValue - 사용자의 입력 값
   * @throws {AppError} 유효성을 만족하지 않을 경우 에러 발생
   * @returns {void}
   */
  check(inputValue) {
    startValidation(this.validationTypes, inputValue);
  },
});

export default WinningNumberValidator;
