import EXCEPTION from '../constants/exception.js';

export const prizeNumberValidator = {
  isAllFilled(numbers) {
    return numbers.every((number) => !Number.isNaN(number));
  },

  isDuplicated(numbers) {
    return numbers.length !== new Set(numbers).size;
  },
};

export const validatePrizeNumber = (numbers) => {
  if (!prizeNumberValidator.isAllFilled(numbers)) {
    throw new Error(EXCEPTION.BLANK_PRIZE_NUMBER);
  }

  if (prizeNumberValidator.isDuplicated(numbers)) {
    throw new Error(EXCEPTION.DUPLICATED_NUMBER);
  }
};
