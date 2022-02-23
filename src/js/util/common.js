import { RULES } from '../constants/index.js';

const pickLottoNumber = n => {
  const lottos = new Set();

  while (lottos.size < n) {
    const number = getRandomNumber(
      RULES.MIN_LOTTO_NUMBER,
      RULES.MAX_LOTTO_NUMBER,
    );
    lottos.add(number);
  }

  return [...lottos];
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { pickLottoNumber };
