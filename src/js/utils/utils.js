import { LOTTO_NUMBERS } from './constants.js';

export function getRandomNumber() {
  return Math.floor(Math.random() * LOTTO_NUMBERS.LOTTO_MAX_NUM) + 1;
}
