import ERROR from "../constants/error-messages.js";
import { LOTTO_PRICE } from "../constants/lotto-constants.js";

import AppError from "../utils/Error.js";

const purchaseAmountValidator = {
  validateType(price) {
    if (Number.isNaN(Number(price))) {
      throw new AppError(ERROR.INVALID_PURCHASE_AMOUNT_TYPE);
    }
  },

  validateRange(price) {
    if (Number(price) < LOTTO_PRICE) {
      throw new AppError(ERROR.INVALID_PURCHASE_AMOUNT_RANGE);
    }
  },

  validateDivided(price) {
    if (price % LOTTO_PRICE !== 0) {
      throw new AppError(ERROR.INVALID_PURCHASE_AMOUNT_DIVIDED);
    }
  },

  validate(price) {
    this.validateType(price);
    this.validateRange(price);
    this.validateDivided(price);
  },
};

export default purchaseAmountValidator;
