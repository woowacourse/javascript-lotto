import {
  ERROR_MESSAGE,
  MAX_LOTTO_NUMBER,
  MINIMUM_LOTTO_UNIT,
  MIN_LOTTO_NUMBER,
  LOTTO_LENGTH,
} from '../data/Constants';
import IO from './IO';

const {
  NOT_NUMBER,
  NOT_POSITIVE_NUMBER,
  NOT_DIVIDE_MINIMUM_LOTTO_UNIT,
  OVER_RANGE,
  DUPLICATE_NUMBER,
  NOT_MATCH_LENGTH,
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

  checkDuplicateNumbers: (numbers) => {
    const set = new Set(numbers);

    if (numbers.length !== set.size) {
      throw new Error(DUPLICATE_NUMBER);
    }
  },

  checkIsNumberArray: (numbers) => {
    numbers.forEach((number) => validator.checkNumber(number));
  },

  checkMatchLottoLength: (numbers) => {
    if (numbers.length !== LOTTO_LENGTH) {
      throw new Error(NOT_MATCH_LENGTH);
    }
  },
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

const validateWinningNumbers = (numbers) => {
  validator.checkIsNumberArray(numbers);
  validator.checkOverRange(numbers);
  validator.checkDuplicateNumbers(numbers);
  validator.checkMatchLottoLength(numbers);
};

export { isValidateValue, validatePurchaseAmount, validateWinningNumbers };
