import Lotto from './lotto.js';
import { LOTTO_INFO } from '../constants/constant.js';
export const makeLottoList = lottoPrice => {
  const lottoList = [];
  while (lottoList.length !== calculateGameCount(lottoPrice)) {
    const numberList = makeRandomNumberList();
    if (isOverlapLottoNumber(numberList)) {
      lottoList.push(new Lotto(numberList));
    }
  }
  return lottoList;
};

export const calculateGameCount = value => {
  return value / LOTTO_INFO.LOTTO_PRICE;
};

const makeRandomNumberList = () => {
  return Array.from(
    { length: LOTTO_INFO.LOTTO_NUMBER_COUNT },
    () =>
      Math.floor(
        Math.random() *
          (LOTTO_INFO.LOTTO_NUMBER_MAX - LOTTO_INFO.LOTTO_NUMBER_MIN),
      ) + LOTTO_INFO.LOTTO_NUMBER_MIN,
  );
};

export const isOverlapLottoNumber = lottoNumbers => {
  return lottoNumbers.length === new Set(lottoNumbers).size;
};
