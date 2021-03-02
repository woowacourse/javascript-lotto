import {
  LOTTO,
  PURCHASE_TYPE,
  REWARDS,
  RANK_FOR_MATCHED_COUNT,
} from '../utils/constants.js';
import {
  CALCULATE_PROFIT,
  CREATE_LOTTOS,
  DECIDE_WINNER,
  MANUAL_PURCHASE,
  AUTO_PURCHASE,
  RESTART,
  UPDATE_PAYMENT,
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
    case RESTART:
      return [];
    default:
      return state;
  }
};

export const winningCountReducer = (state, lottos, { type, payload = {} }) => {
  switch (type) {
    case DECIDE_WINNER:
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
        let rank =
          RANK_FOR_MATCHED_COUNT[
            winningNumbers.filter(number => lottoNumbers.includes(number))
              .length
          ];
        rank = rank === 3 && lottoNumbers.includes(bonusNumber) ? 2 : rank;
        rank && winningCountTemp[`rank${rank}`]++;
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
