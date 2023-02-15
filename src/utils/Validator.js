import {
  ERROR_MESSAGE,
  MAX_LOTTO_NUMBER,
  MINIMUM_LOTTO_UNIT,
  MIN_LOTTO_NUMBER,
} from '../data/Constants';
import IO from './IO';

const {
  NOT_NUMBER,
  NOT_POSITIVE_NUMBER,
  NOT_DIVIDE_MINIMUM_LOTTO_UNIT,
  OVER_RANGE,
} = ERROR_MESSAGE;

const validator = {
  checkNumber: (input) => {
    if (Number.isNaN(input)) {
      throw new Error(NOT_NUMBER);
    }
  },
  checkPositiveNumber: (input) => {
    if (input <= 0) {
      throw new Error(NOT_POSITIVE_NUMBER);
    }
  },
  checkDivideLottoUnit: (input) => {
    if (input % MINIMUM_LOTTO_UNIT !== 0) {
      throw new Error(NOT_DIVIDE_MINIMUM_LOTTO_UNIT);
    }
  },

  checkOverRange: (numbers) => {
    if (
      !numbers.every(
        (number) => number <= MAX_LOTTO_NUMBER && number >= MIN_LOTTO_NUMBER
      )
    )
      throw new Error(OVER_RANGE);
  },
};

const printErrorWhenThrow = (
  validateFunction,
  afterErrorFunction,
  nextStep
) => {
  try {
    validateFunction();
    nextStep();
  } catch (error) {
    afterErrorFunction();
  }
};

const isValidateValue = (validator) => {
  try {
    validator();
  } catch (error) {
    IO.output(error);
    return false;
  }

  return true;
};

const validatePurchaseAmount = (amount) => {
  validator.checkNumber(amount);
  validator.checkPositiveNumber(amount);
  validator.checkDivideLottoUnit(amount);
};

const validateWinningNumber = (amount) => {};

export { validatePurchaseAmount, isValidateValue };
