import { LOTTO } from './constants.js';

const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const sortNumbers = numbers => numbers.sort((a, b) => a - b);

export const divide = (a, b) => Math.floor(a / b);

export const mod = (a, b) => a % b;

export const generateLottoNumbers = () => {
  const lottoNumbers = new Set();
  while (lottoNumbers.size < LOTTO.LENGTH) {
    lottoNumbers.add(generateRandomNumber(LOTTO.MIN_NUM, LOTTO.MAX_NUM));
  }

  return sortNumbers([...lottoNumbers]);
};

export const isValidLottoNumbers = numbers =>
  numbers.length === LOTTO.LENGTH && new Set(numbers).size === numbers.length;
