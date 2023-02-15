import { LOTTO_CONDITION } from '../constants/condition.js';
import { ERROR_MESSAGE } from '../constants/message.js';

const Validation = {
  isValidPurchaseAmount(purchaseAmount) {
    if (!this.isNumber(purchaseAmount)) {
      throw new Error(ERROR_MESSAGE.invalidInputType);
    }

    if (!this.isHigherThanLottoPrice(purchaseAmount)) {
      throw new Error(ERROR_MESSAGE.lowerThanLottoPrice);
    }

    if (!this.isDivisibleByLottoPrice(purchaseAmount)) {
      throw new Error(ERROR_MESSAGE.indivisibleByLottoPrice);
    }
  },

  isNumber(purchaseAmount) {
    return Number.isInteger(Number(purchaseAmount));
  },

  isHigherThanLottoPrice(purchaseAmount) {
    return purchaseAmount >= LOTTO_CONDITION.lottoPrice;
  },

  isDivisibleByLottoPrice(purchaseAmount) {
    return purchaseAmount % LOTTO_CONDITION.lottoPrice === 0;
  },
};

export default Validation;
