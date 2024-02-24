import { LOTTO_NUMBER_LENGTH, LOTTO_NUMBER_RANGE, LOTTO_PRICE } from '../constants/lotto-constants.js';
import createUniqueNumbersInRange from '../utils/createUniqueNumbersInRange.js';

import Lotto from './Lotto.js';

const lottoMachine = {
  makeLottos: (purchaseAmount) => {
    return Array.from(
      { length: purchaseAmount / LOTTO_PRICE },
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
