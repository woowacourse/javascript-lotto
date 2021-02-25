import {
  CALCULATE_PROFIT,
  CREATE_LOTTOS,
  DECIDE_WINNER,
  RESTART,
  UPDATE_PAYMENT,
} from './actionType.js';

export const updatePayment = value => {
  'use strict'; // 중복 속성명 막기 위함
  return {
    type: UPDATE_PAYMENT,
    payload: { payment: value },
  };
};

export const createLottos = () => {
  'use strict';
  return {
    type: CREATE_LOTTOS,
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
