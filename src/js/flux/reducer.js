import ACTION from './actions';
import { LOTTO } from '../constants';
import { pickUniqueNumbersInRange } from '../utils';

const generateLottoList = (money) => {
  const lottoList = [];
  const count = Math.floor(money / 1000);

  for (let i = 0; i < count; i += 1) {
    const { RANGE, COUNT } = LOTTO;
    lottoList.push(pickUniqueNumbersInRange(RANGE.MIN, RANGE.MAX, COUNT));
  }

  return lottoList;
};

export default function reducer(state, { type, payload }) {
  const newState = { ...state };

  if (type === ACTION.PURCHASE_LOTTO) {
    newState.money = payload;
    const lottoList = generateLottoList(payload);
    newState.lottoList = lottoList;
  } else if (type === ACTION.TOGGLE_LOTTO_LIST) {
    newState.lottoListVisibility = payload;
  } else if (type === ACTION.SET_WINNING_NUMBERS) {
    newState.winningNumbers = payload;
  }

  return newState;
}
