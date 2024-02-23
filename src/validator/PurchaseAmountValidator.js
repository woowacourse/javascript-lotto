import ERROR from "../constants/error.js";
import { MIN_PURCHASE_AMOUNT } from "../constants/option.js";

const validate = {
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
};

export default function purchaseAmountValidator(price) {
  validate.validateType(price);
  validate.validateRange(price);
  validate.validateDivided(price);
}
