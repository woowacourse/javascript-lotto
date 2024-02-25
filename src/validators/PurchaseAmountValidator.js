import { ERROR, PURCHASE_AMOUNT } from '../constants';

const PurchaseAmountValidator = {
  validate(inputValue) {
    this.validateInteger(inputValue);
    this.validateUnit(inputValue);
    this.validateAboveMinRange(inputValue);
  },

  validateInteger(inputValue) {
    if (!Number.isInteger(inputValue)) throw new Error(ERROR.INVALID_NUMBER_FORMAT);
  },

  validateUnit(inputValue) {
    if (inputValue % PURCHASE_AMOUNT.UNIT !== 0) throw new Error(ERROR.INVALID_UNIT);
  },

  validateAboveMinRange(inputValue) {
    if (!(inputValue >= PURCHASE_AMOUNT.MIN)) throw new Error(ERROR.MIN_PURCHASE_AMOUNT);
  },
};

export default PurchaseAmountValidator;
