import Lotto from './lotto.js';
import {
  RANDOM_MIN,
  RANDOM_MAX,
  NUMBER_LIST_LENGTH,
} from '../constants/constant.js';

export const makeLottos = lottoCount => {
  const lottos = [];
  while (lottos.length !== lottoCount) {
    const numberList = makeRandomNumberList();
    if (isOverlapLottoNumber(numberList)) {
      lottos.push(new Lotto(numberList));
    }
  }
};

const makeRandomNumberList = () => {
  const randomNumberList = [];
  for (let i = 0; i < NUMBER_LIST_LENGTH; i++) {
    randomNumberList.push(
      Math.floor(Math.random() * (RANDOM_MAX - RANDOM_MIN)) + RANDOM_MIN,
    );
  }
  return randomNumberList;
};

export const isOverlapLottoNumber = lottoNumbers => {
  const isCorrectValue = lottoNumbers.length === new Set(lottoNumbers).size;
  return isCorrectValue;
};
