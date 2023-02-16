const { errorMessage } = require('../constants/constants');
const validator = require('../domain/validation/validator');

const exception = {
  checkPurchasePrice(input) {
    if (validator.isPurchasePriceValid(input)) return;

    throw new Error(errorMessage.PURCHASE_PRICE_ERROR);
  },
};

module.exports = exception;
