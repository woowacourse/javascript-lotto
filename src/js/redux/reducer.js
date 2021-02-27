import { LOTTO, PURCHASE_TYPE, REWARDS } from '../utils/constants.js';
import {
  CALCULATE_PROFIT,
  CREATE_LOTTOS,
  DECIDE_WINNER,
  MANUAL_PURCHASE,
  AUTO_PURCHASE,
  RESTART,
  UPDATE_PAYMENT,
  ADD_LOTTO,
} from '../redux/actionType.js';

const paymentReducer = (state = 0, { type, payload = {} }) => {
  switch (type) {
    case UPDATE_PAYMENT:
      return payload.payment;
    case RESTART:
      return -1;
    default:
      return state;
  }
};

const purchaseTypeReducer = (state = 'auto', { type }) => {
  switch (type) {
    case MANUAL_PURCHASE:
      return PURCHASE_TYPE.MANUAL;
    case AUTO_PURCHASE:
      return PURCHASE_TYPE.AUTO;
    default:
      return state;
  }
};

const lottosReducer = (state = [], { type, payload = {} }) => {
  const { lottos } = payload;
  switch (type) {
    case CREATE_LOTTOS:
      return [...state, ...lottos];
    case ADD_LOTTO:
      return [...state, ...lottos];
    case RESTART:
      return [];
    default:
      return state;
  }
};

export const winningCountReducer = (state, lottos, { type, payload = {} }) => {
  const getMatchedCount = (winningNumbers, numbers) => {
    let count = 0;
    numbers.forEach(number => {
      if (winningNumbers.includes(number)) count++;
    });
    return count;
  };

  const countWinner = (winningNumbers, bonusNumber, lottoNumbers) => {
    const count = getMatchedCount(winningNumbers, lottoNumbers);
    if (count === 6) {
      return 1;
    } else if (count === 5 && lottoNumbers.includes(bonusNumber)) {
      return 2;
    } else if (count === 5) {
      return 3;
    } else if (count === 4) {
      return 4;
    } else if (count === 3) {
      return 5;
    }
    return -1;
  };

  switch (type) {
    case DECIDE_WINNER:
      console.log(lottos);
      const { winningNumbers, bonusNumber } = payload;
      const winningCountTemp = {};
      let i = 0;
      Object.assign(
        winningCountTemp,
        Object.seal({
          ['rank' + ++i]: 0,
          ['rank' + ++i]: 0,
          ['rank' + ++i]: 0,
          ['rank' + ++i]: 0,
          ['rank' + ++i]: 0,
        }),
      );

      lottos.forEach(lottoNumbers => {
        const rank = countWinner(winningNumbers, bonusNumber, lottoNumbers);
        rank !== -1 && winningCountTemp[`rank${rank}`]++;
      });

      return winningCountTemp;
    case RESTART:
      return {};
    default:
      return state;
  }
};

export const profitReducer = (state, lottoCount, winningCount, { type }) => {
  switch (type) {
    case CALCULATE_PROFIT:
      const investment = lottoCount * LOTTO.PRICE;
      const totalProfit = Object.keys(winningCount).reduce(
        (currProfit, key) => currProfit + REWARDS[key] * winningCount[key],
        0,
      );
      const profitRatio = (
        ((totalProfit - investment) / investment) *
        100
      ).toFixed(2);
      return profitRatio;

    case RESTART:
      return 0;

    default:
      return state;
  }
};

const combineReducers = (states, action) => {
  return {
    payment: paymentReducer(states.payment, action),
    purchaseType: purchaseTypeReducer(states.purchaseType, action),
    lottos: lottosReducer(states.lottos, action),
    winningCount: winningCountReducer(
      states.winningCount,
      states.lottos,
      action,
    ),
    profit: profitReducer(
      states.profit,
      states.lottos ? states.lottos.length : 0,
      states.winningCount,
      action,
    ),
  };
};

export default combineReducers;
