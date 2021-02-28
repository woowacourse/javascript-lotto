import { MSG_INVALID_PAYMENT, UNIT_AMOUNT } from './constants.js';

export const checkValidPayment = money => {
  if (!(money / UNIT_AMOUNT > 0 && money % UNIT_AMOUNT === 0)) {
    return MSG_INVALID_PAYMENT;
  }

  return '';
};
