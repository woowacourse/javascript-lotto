import { LOTTO_CONDITION } from '../constants/constants.js';

export function getRandomNumber(min, max) {
  const numbers = new Set();

  while (numbers.size < LOTTO_CONDITION.COUNT) {
    const randomNumber = Math.floor(Math.random() * max) + min;
    numbers.add(randomNumber);
  }

  return [...numbers];
}
