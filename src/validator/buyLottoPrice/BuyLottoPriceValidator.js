import { startValidation } from '../startValidation.js';
import { deepFreeze } from '../../utils/object/object.js';

/**
 * @module BuyLottoPriceValidator
 * @type {import('../../types/jsDoc.js').BuyLottoPriceValidator}
 * 로또 구입 금액 입력에 대한 유효성 검사를 수행하는 모듈
 */
const BuyLottoPriceValidator = deepFreeze({
  validationTypes: {
    /**
     * @type {import('../../types/jsDoc.js').BuyLottoPriceValidationTypes}
     */
    isTypeOfNumber: {
      errorMessage: '로또 구입 금액의 형식이 올바르지 않습니다. 다시 입력해주세요.',
      isValid(inputValue) {
        return /^\d+$/.test(inputValue);
      },
    },

    outOfRange: {
      errorMessage: '로또 구입 금액은 1,000원 ~ 10,000원 사이여야 합니다. 다시 입력해주세요.',
      isValid(inputValue) {
        const amount = Number(inputValue);
        return amount >= 1000 && amount <= 10000;
      },
    },

    notInThousandUnit: {
      errorMessage: '로또 구입 금액은 1,000원 단위여야 합니다. 다시 입력해주세요.',
      isValid(inputValue) {
        const amount = Number(inputValue);
        return amount % 1000 === 0;
      },
    },
  },

  /**
   * 사용자의 입력 금액에 대한 유효성 검사 실행
   * @param {string} inputValue - 사용자의 입력 값
   * @throws {AppError} 유효성을 만족하지 않을 경우 에러 발생
   * @returns {void}
   */
  check(inputValue) {
    startValidation(this.validationTypes, inputValue);
  },
});

export default BuyLottoPriceValidator;
