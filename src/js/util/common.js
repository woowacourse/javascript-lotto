import { RULES } from '../constants/index.js';

const isEmpty = value => value === null;

const isZero = value => value === 0;

const isNotNumber = value => Number.isNaN(value) || typeof value !== 'number';

const isNegativeNumber = value => value < 0;

const isNotUnitOfThousand = value => value % RULES.LOTTO_PRICE !== 0;

const convertToNumber = value => Number(value);

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

export {
  convertToNumber,
  pickLottoNumber,
  isZero,
  isNotNumber,
  isEmpty,
  isNegativeNumber,
  isNotUnitOfThousand,
};
