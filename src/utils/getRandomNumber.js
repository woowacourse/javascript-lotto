import { LOTTO_CONDITION } from '../constants/constants.js';

export function getRandomNumber() {
  const numbers = new Set();

  while (numbers.size < LOTTO_CONDITION.COUNT) {
    const randomNumber = Math.floor(Math.random() * LOTTO_CONDITION.MAX_NUMBER) + LOTTO_CONDITION.MIN_NUMBER;
    numbers.add(randomNumber);
  }

  return [...numbers];
}
