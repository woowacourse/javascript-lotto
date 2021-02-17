import {
  LOTTO_LENGTH,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
} from './constants.js';

const generateRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const divide = (a, b) => Math.floor(a / b);

export const mod = (a, b) => a % b;

export const generateLottoNumbers = () => {
  const lottoNumbers = new Set();
  while (lottoNumbers.size < LOTTO_LENGTH) {
    lottoNumbers.add(generateRandomNumber(MIN_LOTTO_NUMBER, MAX_LOTTO_NUMBER));
  }

  return [...lottoNumbers];
};

export const isValidLottoNumbers = numbers =>
  numbers.length === LOTTO_LENGTH && new Set(numbers).size === numbers.length;
