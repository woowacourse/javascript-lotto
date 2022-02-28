import { ERROR_MESSAGE, RULES } from '../constants/index.js';

const isEmpty = value => {
  return value === null;
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

const validateWinningNumbers = numbers => {
  const filteredNumbers = numbers.filter(number => {
    return number >= RULES.MIN_LOTTO_NUMBER && number <= RULES.MAX_LOTTO_NUMBER;
  });
  
  if (
    filteredNumbers.length !== RULES.LOTTO_NUMS + RULES.BONUS_NUMS ||
    numbers.length > new Set(numbers).size
  ) {
    throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS);
  }
};

export { isEmpty, validatePurchaseMoney, validateWinningNumbers };
