import { ERROR_MESSAGE, RULES } from '../constants/index.js';

const isExist = value => {
  return value !== null;
};

const isZero = value => {
  return value === 0;
};

const isNotNumber = value => {
  return Number.isNaN(value) || typeof value !== 'number';
};

const isNegativeNumber = value => {
  return value < 0;
};

const isNotUnitOfThousand = value => {
  return value % RULES.LOTTO_PRICE !== 0;
};

const validatePurchaseMoney = value => {
  if (isZero(value)) {
    throw new Error(ERROR_MESSAGE.ZERO_MONEY);
  }

  if (isNotNumber(value)) {
    throw new Error(ERROR_MESSAGE.NOT_NUMBER_TYPE);
  }

  if (isNegativeNumber(value)) {
    throw new Error(ERROR_MESSAGE.NEGATIVE_NUMBER);
  }

  if (isNotUnitOfThousand(value)) {
    throw new Error(ERROR_MESSAGE.NOT_UNIT_OF_THOUSAND);
  }
};

export { validatePurchaseMoney, isExist };
