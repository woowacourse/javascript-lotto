import Lotto from './lotto.js';
import {
  RANDOM_MIN,
  RANDOM_MAX,
  NUMBER_LIST_LENGTH,
  LOTTO_PRICE,
} from '../constants/constant.js';
import {
  renderLastLottoNumber,
  renderPurchasedLottoList,
} from '../views/render.js';

export const drawLotto = lottoPrice => {
  if (lottoPrice === undefined) {
    return;
  }
  const lottoCount = numberOfLotto(lottoPrice);
  makeLottos(lottoCount);
  renderPurchasedLottoList(lottoCount);
  renderLastLottoNumber();
};

const makeLottos = lottoCount => {
  const lottos = [];
  while (lottos.length !== lottoCount) {
    const numberList = makeRandomNumberList();
    if (isOverlapLottoNumber(numberList)) {
      lottos.push(new Lotto(numberList));
    }
  }
};

export const numberOfLotto = value => {
  return value / LOTTO_PRICE;
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
