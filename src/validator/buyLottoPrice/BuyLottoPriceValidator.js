import LottoBuyer from '../../domain/LottoBuyer/LottoBuyer.js';

import { startValidation } from '../startValidation.js';

import { deepFreeze } from '../../utils/object/object.js';

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
        const buyLottoPrice = Number(inputValue);

        return (
          !Number.isNaN(buyLottoPrice) && Number.isInteger(buyLottoPrice) && buyLottoPrice >= 0
        );
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

  /**
   * 사용자의 입력 금액에 대한 유효성 검사 실행
   * @param {string} inputValue - 사용자의 입력 값
   * @returns {void}
   */
  check(inputValue) {
    startValidation(this.validationTypes, inputValue);
  },
});

export default BuyLottoPriceValidator;
