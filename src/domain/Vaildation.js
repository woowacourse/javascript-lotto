import { LOTTO_CONDITION } from '../constants/condition.js';

const Validation = {
  isNumber(purchaseAmount) {
    return Number.isInteger(Number(purchaseAmount));
  },

  isHigherThanLottoPrice(purchaseAmount) {
    return purchaseAmount >= LOTTO_CONDITION.lottoPrice;
  },
};

export default Validation;
