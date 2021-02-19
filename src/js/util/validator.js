import {
  MSG_INVALID_PURCHASE_AMOUNT,
  UNIT_AMOUNT,
} from '../constants/index.js';

export const validator = {
  purchaseAmountInput: money => {
    if (!(money / UNIT_AMOUNT > 0 && money % UNIT_AMOUNT === 0)) {
      return MSG_INVALID_PURCHASE_AMOUNT;
    }

    return '';
  },
};
