import LottoBuyer from '../../domain/LottoBuyer/LottoBuyer.js';

import { startValidation } from '../startValidation.js';
import { deepFreeze } from '../../utils/object/object.js';
import { TYPE_OF_NUMBER_REGEXP } from '../../constants/regexp.js';

const { BUY_LOTTO_PRICE_RANGE, LOTTO_PRICE_PER_UNIT } = LottoBuyer;

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
        return TYPE_OF_NUMBER_REGEXP.test(inputValue);
      },
    },

    outOfRange: {
      errorMessage: `로또 구입 금액은 ${BUY_LOTTO_PRICE_RANGE.min.toLocaleString()}원 ~ ${BUY_LOTTO_PRICE_RANGE.max.toLocaleString()}원 사이여야 합니다. 다시 입력해주세요.`,
      isValid(inputValue) {
        const amount = Number(inputValue);
        return amount >= BUY_LOTTO_PRICE_RANGE.min && amount <= BUY_LOTTO_PRICE_RANGE.max;
      },
    },

    notInThousandUnit: {
      errorMessage: `로또 구입 금액은 ${LOTTO_PRICE_PER_UNIT}원 단위여야 합니다. 다시 입력해주세요.`,
      isValid(inputValue) {
        const amount = Number(inputValue);
        return amount % LOTTO_PRICE_PER_UNIT === 0;
      },
    },
  },

  // TODO: AppError 제거
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
