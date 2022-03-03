import ACTION from './actions';
import initialState from './initialState';
import { LOTTO, MATCH_COUNT } from '../constants';
import pickUniqueNumbersInRange from '../utils';

const generateLottoList = (money) => {
  const lottoList = [];
  const count = Math.floor(money / 1000);

  for (let i = 0; i < count; i += 1) {
    const { RANGE, COUNT } = LOTTO;
    lottoList.push(pickUniqueNumbersInRange(RANGE.MIN, RANGE.MAX, COUNT));
  }

  return lottoList;
};

// eslint-disable-next-line max-lines-per-function
const generateWinningCounts = (winningNumbers, bonusNumber) => {
  const winningCounts = { fifth: 0, fourth: 0, third: 0, second: 0, first: 0 };
  const { lottoList } = window.store.getState();

  // eslint-disable-next-line max-lines-per-function
  lottoList.forEach((lottoItem) => {
    let winningCount = 0;
    lottoItem.forEach((number) => {
      if (winningNumbers.includes(number)) winningCount += 1;
    });

    switch (winningCount) {
      case MATCH_COUNT.FIFTH:
        winningCounts.fifth += 1;
        break;
      case MATCH_COUNT.FOURTH:
        winningCounts.fourth += 1;
        break;
      case MATCH_COUNT.THIRD:
        if (!lottoItem.includes(bonusNumber)) {
          winningCounts.third += 1;
          break;
        }
        winningCounts.second += 1;
        break;
      case MATCH_COUNT.FIRST:
        winningCounts.first += 1;
        break;
      // no default
    }
  });

  return winningCounts;
};

const generateResult = (winningNumber) => {
  const result = {};
  const winningNumbers = winningNumber.slice(0, LOTTO.COUNT);
  const bonusNumber = winningNumber[LOTTO.COUNT];
  result.winningCounts = generateWinningCounts(winningNumbers, bonusNumber);

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
      newState.result = generateResult(payload.map((value) => Number(value)));

      return newState;
    case ACTION.RESTART:
      return initialState;
    default:
      return state;
  }
}
