import { startValidation } from '../startValidation.js';
import { deepFreeze } from '../../utils/object/object.js';
import Lotto from '../../domain/Lotto/Lotto.js';

/**
 * @module BonusNumberValidator
 * @type {import('../../types/jsDoc.js').BonusNumberValidator}
 * 보너스 번호 입력에 대한 유효성 검사를 수행하는 모듈
 */
const BonusNumberValidator = deepFreeze({
  validationTypes: {
    /**
     * @type {import('../../types/jsDoc.js').BonusNumberValidationTypes}
     */
    isTypeOfNumber: {
      errorMessage: '보너스 번호의 형식이 유효하지 않습니다. 다시 입력해 주세요.',
      isValid({ inputValue }) {
        return /^\d+$/.test(inputValue);
      },
    },

    isValidRange: {
      errorMessage: `보너스 번호는 ${Lotto.LOTTO_DETAILS.min} ~ ${Lotto.LOTTO_DETAILS.max} 사이여야 합니다. 다시 입력해 주세요.`,
      isValid({ inputValue }) {
        const bonusNumber = Number(inputValue);

        return bonusNumber >= Lotto.LOTTO_DETAILS.min && bonusNumber <= Lotto.LOTTO_DETAILS.max;
      },
    },

    isUniqueBonusNumber: {
      errorMessage: '보너스 번호는 당첨 번호에 포함되지 않은 번호여야 합니다. 다시 입력해 주세요.',
      isValid({ inputValue, winningNumbers }) {
        const bonusNumber = Number(inputValue);
        return !winningNumbers.includes(bonusNumber);
      },
    },
  },

  /**
   * 사용자의 입력 보너스 번호에 대한 유효성 검사 실행
   * @param {string} inputValue - 사용자의 입력 값
   * @param {number[]} winningNumbers - 당첨 번호 목록
   * @throws {AppError} 유효성을 만족하지 않을 경우 에러 발생
   * @returns {void}
   */
  check(inputValue, winningNumbers) {
    startValidation(this.validationTypes, { inputValue, winningNumbers });
  },
});

export default BonusNumberValidator;
