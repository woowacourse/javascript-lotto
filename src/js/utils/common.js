import { RULES } from '../constants/index.js';

export const isEmpty = value => {
  return value === null;
};

export const isZero = value => {
  return value === 0;
};

export const isNotNumber = value => {
  return Number.isNaN(value) || typeof value !== 'number';
};

export const isNegativeNumber = value => {
  return value < 0;
};

export const isNotUnitOfThousand = value => {
  return value % RULES.LOTTO_PRICE !== 0;
};

export const convertToNumber = value => {
  return Number(value);
};

export const pickLottoNumber = n => {
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
