import { ALERT_MESSAGE, LOTTO_PRICE } from '../constants';

export const validateCashInput = cash => {
  if (cash % LOTTO_PRICE !== 0) {
    throw new Error(ALERT_MESSAGE.NOT_DIVISIBLE);
  }
};

export const validateWinningNumbers = (regularNumbers, bonusNumber) => {
  if (new Set([...regularNumbers, bonusNumber]).size !== 7) {
    throw new Error(ALERT_MESSAGE.DUPLICATED_NUMBERS);
  }
};
