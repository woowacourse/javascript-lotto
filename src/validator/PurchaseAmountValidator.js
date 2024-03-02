import { PURCHASE_SYMBOL } from '../constant/symbols';

const PurchaseAmountValidator = {
  isNumber(inputValue) {
    return !Number.isNaN(inputValue);
  },

  isValidUnit(inputValue) {
    return inputValue % PURCHASE_SYMBOL.UNIT === 0;
  },

  isValidMinRange(inputValue) {
    return inputValue >= PURCHASE_SYMBOL.RANGE_MIN;
  },
};

export default PurchaseAmountValidator;
