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

// eslint-disable-next-line max-lines-per-function
export default function reducer(state, { type, payload }) {
  const newState = { ...state };

  switch (type) {
    case ACTION.PURCHASE_LOTTO: {
      newState.money = payload;
      newState.lottoList = generateLottoList(payload);
      break;
    }
    case ACTION.TOGGLE_LOTTO_LIST:
      newState.lottoListVisibility = payload;
      break;
    case ACTION.SET_WINNING_NUMBERS:
      newState.winningNumbers = payload;
      break;
    // no default
  }

  return newState;
}
