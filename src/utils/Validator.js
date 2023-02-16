import {
  ERROR_MESSAGE,
  MINIMUM_LOTTO_UNIT,
  LOTTO_LENGTH,
  LOTTO_RANGE,
  YES,
  NO,
} from '../data/Constants';
import IO from './IO';
import { isNumberInRange } from './Utils';

const {
  NOT_NUMBER,
  NOT_POSITIVE_NUMBER,
  NOT_DIVIDE_MINIMUM_LOTTO_UNIT,
  OVER_RANGE,
  DUPLICATE_NUMBER,
  NOT_MATCH_LENGTH,
  DUPLICATE_WINNING_NUMBER,
  NOT_INPUT_YES_OR_NO,
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

  checkOverRange: (number, range) => {
    if (!isNumberInRange(number, range)) {
      throw new Error(OVER_RANGE);
    }
  },

  checkOverRangeInArray: (numbers, range) => {
    numbers.forEach((number) => validator.checkOverRange(number, range));
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

  checkDuplicateWInningNumber: (number, winningNumber) => {
    if (winningNumber.includes(number)) {
      throw new Error(DUPLICATE_WINNING_NUMBER);
    }
  },

  checkInputYesOrNo: (input) => {
    if (input !== YES && input !== NO) {
      throw new Error(NOT_INPUT_YES_OR_NO);
    }
  },
};

const errorChecker = (validator) => {
  try {
    validator();
  } catch (error) {
    IO.output(error);
    return true;
  }

  return false;
};

const validatePurchaseAmount = (amount) => {
  validator.checkNumber(amount);
  validator.checkPositiveNumber(amount);
  validator.checkDivideLottoUnit(amount);
};

const validateWinningNumbers = (numbers) => {
  validator.checkIsNumberArray(numbers);
  validator.checkOverRangeInArray(numbers, LOTTO_RANGE);
  validator.checkDuplicateNumbers(numbers);
  validator.checkMatchLottoLength(numbers);
};

const validateBonusNumber = (number, winningNumber) => {
  validator.checkNumber(number);
  validator.checkOverRange(number, LOTTO_RANGE);
  validator.checkDuplicateWInningNumber(number, winningNumber);
};

const validateRestartInput = (input) => {
  validator.checkInputYesOrNo(input);
};

export {
  errorChecker,
  validatePurchaseAmount,
  validateWinningNumbers,
  validateBonusNumber,
  validateRestartInput,
};
