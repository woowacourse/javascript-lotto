import ERROR from "../constants/error.js";
import { MIN_PURCHASE_AMOUNT } from "../constants/option.js";

const purchaseAmountValidator = {
  validateType(price) {
    if (Number.isNaN(Number(price))) {
      throw new Error(ERROR.INVALID_PURCHASE_AMOUNT_TYPE);
    }
  },

  validateRange(price) {
    if (Number(price) < MIN_PURCHASE_AMOUNT) {
      throw new Error(ERROR.INVALID_PURCHASE_AMOUNT_RANGE);
    }
  },

  validateDivided(price) {
    if (price % MIN_PURCHASE_AMOUNT !== 0) {
      throw new Error(ERROR.INVALID_PURCHASE_AMOUNT_DIVIDED);
    }
  },

  validate(price) {
    this.validateType(price);
    this.validateRange(price);
    this.validateDivided(price);
  },
};

export default purchaseAmountValidator;
