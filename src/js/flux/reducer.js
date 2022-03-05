import ACTION from './actions';
import initialState from './initialState';
import { LOTTO, MATCH_COUNT, PRIZE_MONEY } from '../constants';
import { calculateEarningsRate, intersection, pickUniqueNumbersInRange } from '../utils';

const generateLottoList = (money) => {
  const lottoList = [];
  const count = Math.floor(money / LOTTO.PRICE);

  for (let i = 0; i < count; i += 1) {
    const { RANGE, COUNT } = LOTTO;
    lottoList.push(pickUniqueNumbersInRange(RANGE.MIN, RANGE.MAX, COUNT));
  }

  return lottoList;
};

// eslint-disable-next-line max-lines-per-function
const generateWinningCounts = (winningNumbers, bonusNumber) => {
  const winningCounts = { '5th': 0, '4th': 0, '3rd': 0, '2nd': 0, '1st': 0 };
  const { lottoList } = window.store.getState();

  // eslint-disable-next-line max-lines-per-function
  lottoList.forEach((lottoItem) => {
    const winningCount = intersection(lottoItem, winningNumbers).length;

    switch (winningCount) {
      case MATCH_COUNT['5th']:
        winningCounts['5th'] += 1;
        break;
      case MATCH_COUNT['4th']:
        winningCounts['4th'] += 1;
        break;
      case MATCH_COUNT['3rd']:
        if (!lottoItem.includes(bonusNumber)) {
          winningCounts['3rd'] += 1;
          break;
        }
        winningCounts['2nd'] += 1;
        break;
      case MATCH_COUNT['1st']:
        winningCounts['1st'] += 1;
        break;
      // no default
    }
  });

  return winningCounts;
};

const generateEarningsRate = (winningCounts) => {
  const { money } = window.store.getState();
  const currentMoney = Object.keys(winningCounts).reduce(
    (acc, rank) => acc + winningCounts[rank] * PRIZE_MONEY[rank],
    0
  );

  return calculateEarningsRate(money, currentMoney);
};

const generateResult = (winningNumber) => {
  const result = {};
  const winningNumbers = winningNumber.slice(0, LOTTO.COUNT).map(Number);
  const bonusNumber = Number(winningNumber[LOTTO.COUNT]);
  result.winningCounts = generateWinningCounts(winningNumbers, bonusNumber);
  result.earningsRate = generateEarningsRate(result.winningCounts);

  return result;
};

// eslint-disable-next-line max-lines-per-function
export default function reducer(state, { type, payload }) {
  const newState = { ...state };

  switch (type) {
    case ACTION.PURCHASE_LOTTO: {
      newState.money = payload;
      newState.lottoList = generateLottoList(payload);

      return newState;
    }
    case ACTION.TOGGLE_LOTTO_LIST:
      newState.lottoListVisibility = payload;

      return newState;
    case ACTION.TOGGLE_RESULT_MODAL:
      newState.resultModalVisibility = payload;

      return newState;
    case ACTION.UPDATE_RESULT:
      newState.winningNumbers = payload.slice(0, LOTTO.COUNT);
      newState.bonusNumber = payload[LOTTO.COUNT];
      newState.result = generateResult(payload);

      return newState;
    case ACTION.RESTART:
      return initialState;
    default:
      return state;
  }
}
