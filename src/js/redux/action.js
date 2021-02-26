import { generateRandomNumber } from '../utils/common.js';
import { LOTTO } from '../utils/constants.js';
import {
  CALCULATE_PROFIT,
  CREATE_LOTTOS,
  DECIDE_WINNER,
  RESTART,
  UPDATE_PAYMENT,
} from './actionType.js';

export const updatePayment = value => {
  'use strict';
  return {
    type: UPDATE_PAYMENT,
    payload: { payment: value },
  };
};

export const createLottos = payment => {
  'use strict';

  const generateLottoNumbers = () => {
    const lottoNumbers = new Set();
    while (lottoNumbers.size < LOTTO.LENGTH) {
      lottoNumbers.add(generateRandomNumber(LOTTO.MIN_NUM, LOTTO.MAX_NUM));
    }
    return [...lottoNumbers];
  };

  const lottoCount = Math.floor(payment / LOTTO.PRICE);
  const lottos = Array.from({ length: lottoCount }, () =>
    generateLottoNumbers(),
  );

  return {
    type: CREATE_LOTTOS,
    payload: { lottos },
  };
};

export const decideWinner = (winningNumbers, bonusNumber) => {
  'use strict';
  return {
    type: DECIDE_WINNER,
    payload: {
      winningNumbers,
      bonusNumber,
    },
  };
};

export const calculateProfit = () => {
  'use strict';
  return {
    type: CALCULATE_PROFIT,
  };
};

export const restart = () => {
  'use strict';
  return {
    type: RESTART,
  };
};
