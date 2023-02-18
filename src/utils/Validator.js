import {
  ERROR_MESSAGE,
  MINIMUM_LOTTO_UNIT,
  LOTTO_LENGTH,
  LOTTO_RANGE,
  YES,
  NO,
} from '../data/Constants';
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
  NOT_INTEGER,
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
  checkInteger: (input) => {
    if (!Number.isInteger(input)) {
      throw new Error(NOT_INTEGER);
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

  checkIsIntegerArray: (numbers) => {
    numbers.forEach((number) => validator.checkInteger(number));
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

export const validatePurchaseAmount = (amount) => {
  validator.checkNumber(amount);
  validator.checkPositiveNumber(amount);
  validator.checkDivideLottoUnit(amount);
};

export const validateWinningNumbers = (numbers) => {
  validator.checkIsNumberArray(numbers);
  validator.checkIsIntegerArray(numbers);
  validator.checkOverRangeInArray(numbers, LOTTO_RANGE);
  validator.checkDuplicateNumbers(numbers);
  validator.checkMatchLottoLength(numbers);
};

export const validateBonusNumber = (number, winningNumber) => {
  validator.checkNumber(number);
  validator.checkInteger(number);
  validator.checkOverRange(number, LOTTO_RANGE);
  validator.checkDuplicateWInningNumber(number, winningNumber);
};

export const validateRestartInput = (input) => {
  validator.checkInputYesOrNo(input);
};
