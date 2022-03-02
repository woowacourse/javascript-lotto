import { ERROR_NAME, LOTTO_PRICE } from '../constants';

export const validateCashInput = cash => {
  if (cash % LOTTO_PRICE !== 0) {
    throw new Error(ERROR_NAME.NOT_DIVISIBLE_NUMBER);
  }
};

export const validateWinningNumbers = (regularNumbers, bonusNumber) => {
  if (new Set([...regularNumbers, bonusNumber]).size !== 7) {
    throw new Error(ERROR_NAME.DUPLICATED_NUMBERS);
  }
};
