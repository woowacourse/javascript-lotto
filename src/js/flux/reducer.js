import { ACTION, INITIAL_STATE, LOTTO } from '../constants';
import { pickUniqueNumbersInRange } from '../utils';

const generateLottoList = (money) => {
  const count = Math.floor(money / 1000);
  const { RANGE, COUNT } = LOTTO;
  return Array.from({ length: count }, () => pickUniqueNumbersInRange(RANGE.MIN, RANGE.MAX, COUNT));
};

// eslint-disable-next-line max-lines-per-function
export default function reducer(state, { type, payload }) {
  const newState = { ...state };

  if (type === ACTION.SET_MONEY) {
    newState.money = payload;
  } else if (type === ACTION.PURCHASE_LOTTO) {
    const lottoList = generateLottoList(state.money);
    newState.lottoList = lottoList;
  } else if (type === ACTION.SET_MONEY_FORM_ERROR_MESSAGES) {
    newState.moneyFormErrorMessages = payload;
  } else if (type === ACTION.TOGGLE_LOTTO_LIST) {
    newState.lottoListVisibility = payload;
  } else if (type === ACTION.SET_WINNING_NUMBERS) {
    newState.winningNumbers = payload;
  } else if (type === ACTION.TOGGLE_STATISTICS_MODAL) {
    newState.statisticsModalVisibility = payload;
  } else if (type === ACTION.RESET) {
    return { ...INITIAL_STATE };
  }

  return newState;
}
