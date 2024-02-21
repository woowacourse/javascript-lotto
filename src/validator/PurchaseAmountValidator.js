import ERROR from "../constants/error.js";

const purchaseAmountValidator = {
  validateType(price) {
    if (Number.isNaN(Number(price))) {
      throw new Error(ERROR.INVALID_PURCHASE_AMOUNT_TYPE);
    }
  },

  validateRange(price) {
    if (Number(price) < 1_000) {
      throw new Error(ERROR.INVALID_PURCHASE_AMOUNT_RANGE);
    }
  },

  validateDivided(price) {
    if (price % 1_000 !== 0) {
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
