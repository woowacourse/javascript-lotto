import { ALERT_MESSAGE, LOTTO_PRICE } from '../constants';

export const validateCashInput = cash => {
  if (cash % LOTTO_PRICE !== 0) {
    throw new Error(ALERT_MESSAGE.NOT_DIVISIBLE);
  }
};

export const validatePickedNumbers = pickedNumbers => {
  if (pickedNumbers.length !== new Set(pickedNumbers).size) {
    throw new Error(ALERT_MESSAGE.DUPLICATED_NUMBER);
  }
};
