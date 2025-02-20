import { KEY, LOTTO } from '../constants/CONFIGURATIONS.js';
import { validateType, validateRange, validateCount } from './validate.js';

const validateTypeAll = (winningNumbers) => {
  winningNumbers.forEach((number) => {
    validateType(KEY.WINNING_NUMBERS, number);
  });
};

const validateRangeAll = (winningNumbers) => {
  winningNumbers.forEach((number) => {
    validateRange({
      key: KEY.WINNING_NUMBERS,
      value: number,
      min: LOTTO.MIN_NUMBER,
      max: LOTTO.MAX_NUMBER,
    });
  });
};

const WinningNumbersValidator = {
  validate: (winningNumbers) => {
    validateTypeAll(winningNumbers);
    validateCount(KEY.WINNING_NUMBERS, winningNumbers);
    validateRangeAll(winningNumbers);
  },
};

export { WinningNumbersValidator, validateTypeAll, validateRangeAll };
