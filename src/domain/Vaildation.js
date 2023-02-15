import { LOTTO_CONDITION } from '../constants/condition.js';

const Validation = {
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
