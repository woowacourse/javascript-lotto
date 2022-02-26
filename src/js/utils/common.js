import { LOTTO_RULE } from '../constants.js';

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;

export const makeLottoNumbers = () => {
  const lottoNumbers = new Set();
  while (lottoNumbers.size < LOTTO_RULE.NUMBERS_COUNT) {
    lottoNumbers.add(generateRandomNumber(LOTTO_RULE.MIN_NUMBER, LOTTO_RULE.MAX_NUMBER));
  }
  return lottoNumbers;
};
