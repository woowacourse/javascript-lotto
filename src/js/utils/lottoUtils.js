import getRandomInt from './utils.js';
import { LOTTO } from '../configs/contants.js';

export function getLottoNumber() {
  return getRandomInt(LOTTO.NUMBER_RANGE.MIN, LOTTO.NUMBER_RANGE.MAX);
}

export function getLottoNumberList() {
  return Array(LOTTO.NUMBER_LENGTH)
    .fill()
    .map(() => getLottoNumber());
}
