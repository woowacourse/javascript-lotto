import ERROR from "../constants/error-messages.js";
import { LOTTO_PRICE } from "../constants/lotto-constants.js";
import AppError from "../utils/Error.js";

const purchaseAmountValidator = {
  validateType(formatedPrice) {
    if (Number.isNaN(formatedPrice)) {
      throw new AppError(ERROR.INVALID_PURCHASE_AMOUNT_TYPE);
    }
  },

  validateRange(formatedPrice) {
    if (formatedPrice < LOTTO_PRICE) {
      throw new AppError(ERROR.INVALID_PURCHASE_AMOUNT_RANGE);
    }
  },

  validateDivided(formatedPrice) {
    if (formatedPrice % LOTTO_PRICE !== 0) {
      throw new AppError(ERROR.INVALID_PURCHASE_AMOUNT_DIVIDED);
    }
  },

  validate(price) {
    const formatedPrice = Number(price);
    this.validateType(formatedPrice);
    this.validateRange(formatedPrice);
    this.validateDivided(formatedPrice);
  },
};

export default purchaseAmountValidator;
