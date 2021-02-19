import { NUMBERS } from './constants.js';

export default function getRandomNumber() {
  return Math.floor(Math.random() * NUMBERS.LOTTO_MAX_NUM) + 1;
}
