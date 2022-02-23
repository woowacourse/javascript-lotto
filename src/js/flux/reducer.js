import { LOTTO } from '../constants';

export const PURCHASE_LOTTO = 'purchase-lotto';
export const TOGGLE_LOTTO_LIST = 'toggle-lotto-list';

const pickNumberInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const pickUniqueNumbersInRange = (startInclusive, endInclusive, count) => {
  const numSet = new Set([pickNumberInRange(startInclusive, endInclusive)]);

  while (numSet.size < count) {
    numSet.add(pickNumberInRange(startInclusive, endInclusive));
  }

  return [...numSet.values()];
};

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
  }

  return newState;
}
