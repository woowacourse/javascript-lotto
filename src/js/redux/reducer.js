import { LOTTO, REWARDS } from '../utils/constants.js';
import { generateRandomNumber } from '../utils/common.js';
import {
  CALCULATE_PROFIT,
  CREATE_LOTTOS,
  DECIDE_WINNER,
  RESTART,
  UPDATE_PAYMENT,
} from '../redux/actionType.js';

export const payment = (state = 0, { type, payload = {} }) => {
  switch (type) {
    case UPDATE_PAYMENT:
      if (payload.payment) {
        return payload.payment;
      }
      return state;
    case RESTART:
      return 0;
    default:
      return state;
  }
};

export const lottos = (state = [], payment, { type }) => {
  switch (type) {
    case CREATE_LOTTOS:
      const lottoCount = Math.floor(payment / LOTTO.PRICE);
      const generateLottoNumbers = () => {
        const lottoNumbers = new Set();
        while (lottoNumbers.size < LOTTO.LENGTH) {
          lottoNumbers.add(generateRandomNumber(LOTTO.MIN_NUM, LOTTO.MAX_NUM));
        }
        return [...lottoNumbers];
      };
      const lottos = Array.from({ length: lottoCount }, () =>
        generateLottoNumbers(),
      );
      return lottos;
    case RESTART:
      return [];
    default:
      return state;
  }
};

export const winningCount = (state, lottos, { type, payload = {} }) => {
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
  };

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
        const rank = countWinner(winningNumbers, bonusNumber, lottoNumbers);
        rank && winningCountTemp[`rank${rank}`]++;
      });

      return winningCountTemp;
    case RESTART:
      return {};
    default:
      return state;
  }
};

export const profit = (state, lottoCount, winningCount, { type }) => {
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
