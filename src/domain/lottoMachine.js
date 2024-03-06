import { LOTTO_NUMBER_LENGTH, LOTTO_NUMBER_RANGE, LOTTO_PRICE } from '../constants/lotto-constants.js';
import createUniqueNumbersInRange from '../utils/createUniqueNumbersInRange.js';
import commonValidator from '../validator/commonValidator.js';
import purchaseAmountValidator from '../validator/purchaseAmountValidator.js';

import Lotto from './lotto.js';

const lottoMachine = {
  checkPurchaseAmount: (purchaseAmount) => {
    commonValidator.validate(purchaseAmount);
    purchaseAmountValidator.validate(purchaseAmount);

    return Number(purchaseAmount);
  },

  makeLottos: (purchaseAmount) => {
    const validatedPurchaseAmount = lottoMachine.checkPurchaseAmount(purchaseAmount);
    return Array.from(
      { length: validatedPurchaseAmount / LOTTO_PRICE },
      () =>
        new Lotto(
          createUniqueNumbersInRange({
            start: LOTTO_NUMBER_RANGE.MIN,
            end: LOTTO_NUMBER_RANGE.MAX,
            count: LOTTO_NUMBER_LENGTH,
          }),
        ),
    );
  },
};

export default lottoMachine;
