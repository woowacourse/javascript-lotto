import { ERROR_NAME, LOTTO_PRICE, LOTTO_RULE } from '../constants';

export const validateCashInput = cash => {
  if (cash % LOTTO_PRICE !== 0) {
    throw new Error(ERROR_NAME.NOT_DIVISIBLE_NUMBER);
  }
};

export const validateWinningNumbers = (regularNumbers, bonusNumber) => {
  if (new Set([...regularNumbers, bonusNumber]).size !== LOTTO_RULE.TOTAL_NUMBER_COUNT) {
    throw new Error(ERROR_NAME.DUPLICATED_NUMBERS);
  }
};
