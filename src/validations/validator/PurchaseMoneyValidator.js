import { LOTTO_CONDITION } from '../../constants/constants.js';

export const PurchaseMoneyValidator = {
  isInteger(input) {
    return Number.isInteger(input);
  },

  isValidUnit(input) {
    return input % LOTTO_CONDITION.PRICE === 0;
  },

  isValidRange(input) {
    return LOTTO_CONDITION.PRICE <= input;
  },
};
