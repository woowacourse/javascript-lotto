import { getRandomInt } from './utils.js';
import { LOTTO } from '../configs/contants.js';

export const getLottoNumber = () => {
  return getRandomInt(LOTTO.NUMBER_RANGE.MIN, LOTTO.NUMBER_RANGE.MAX);
};

export const getLottoNumberList = () => {
  return Array(LOTTO.NUMBER_LENGTH)
    .fill()
    .map(() => getLottoNumber());
};
