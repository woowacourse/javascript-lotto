import ERROR from '../constants/error-messages.js';
import { LOTTO_PRICE } from '../constants/lotto-constants.js';
import AppError from '../utils/appError.js';

const purchaseAmountValidator = {
  validateIsNumber(formattedPrice) {
    if (!Number.isInteger(formattedPrice)) {
      throw new AppError(ERROR.INVALID_PURCHASE_AMOUNT_TYPE);
    }
  },

  validateRange(formattedPrice) {
    if (formattedPrice < LOTTO_PRICE) {
      throw new AppError(ERROR.INVALID_PURCHASE_AMOUNT_RANGE);
    }
  },

  validateDivided(formattedPrice) {
    if (formattedPrice % LOTTO_PRICE !== 0) {
      throw new AppError(ERROR.INVALID_PURCHASE_AMOUNT_DIVIDED);
    }
  },

  validate(price) {
    const formattedPrice = Number(price);
    this.validateIsNumber(formattedPrice);
    this.validateRange(formattedPrice);
    this.validateDivided(formattedPrice);
  },
};

export default purchaseAmountValidator;
