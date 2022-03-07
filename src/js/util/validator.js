import { ERROR_MESSAGE, RULES } from '../constants/index.js';

const isEmptyArray = (value) => value.length === 0;

const isZero = (value) => value === 0;

const isNotNumber = (value) => Number.isNaN(value) || typeof value !== 'number';

const isNegativeNumber = (value) => value < 0;

const isNotUnitOfThousand = (value) => value % RULES.LOTTO_PRICE !== 0;

const validatePurchaseMoney = (value) => {
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

const isNegativeWinNumber = (number) => number < RULES.MIN_LOTTO_NUMBER || number > RULES.MAX_LOTTO_NUMBER;

const validateWinNumber = (number) => {
  if (isNegativeWinNumber(number)) {
    throw new Error(ERROR_MESSAGE.WIN_NUMBER_RANGE);
  }
};

export { isEmptyArray, validatePurchaseMoney, validateWinNumber };
