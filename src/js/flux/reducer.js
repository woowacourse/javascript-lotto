import { LOTTO } from '../constants';
import { pickUniqueNumbersInRange } from '../utils';

export const PURCHASE_LOTTO = 'purchase-lotto';
export const TOGGLE_LOTTO_LIST = 'toggle-lotto-list';
export const SET_WINNING_NUMBERS = 'set-winning-numbers';

const generateLottoList = (money) => {
  const lottoList = [];
  const count = Math.floor(money / 1000);

  for (let i = 0; i < count; i += 1) {
    const {
      RANGE: { MIN, MAX },
      COUNT,
    } = LOTTO;
    lottoList.push(pickUniqueNumbersInRange(MIN, MAX, COUNT));
  }

  return lottoList;
};

export function reducer(state, { type, payload }) {
  const newState = { ...state };

  if (type === PURCHASE_LOTTO) {
    newState.money = payload;
    const lottoList = generateLottoList(payload);
    newState.lottoList = lottoList;
  } else if (type === TOGGLE_LOTTO_LIST) {
    newState.lottoListVisibility = payload;
  } else if (type === SET_WINNING_NUMBERS) {
    newState.winningNumbers = payload;
  }

  return newState;
}
