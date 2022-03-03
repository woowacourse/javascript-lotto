import Lotto from './lotto.js';
import { LOTTO_PRICE } from '../constants/constant.js';

export const drawLotto = lottoPrice => {
  if (lottoPrice === undefined) {
    return;
  }
  const lottoCount = getNumberOfLotto(lottoPrice);
  const lottoList = [];
  for (let i = 0; i < lottoCount; i++) {
    const lotto = new Lotto();
    lotto.setLottoNumbers();
    lottoList.push(lotto.numbers);
  }
  return lottoList;
};

const getNumberOfLotto = value => {
  return value / LOTTO_PRICE;
};
