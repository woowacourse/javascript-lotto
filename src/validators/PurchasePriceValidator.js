import { KEY, PURCHASE_PRICE } from '../constants/Configurations.js';
import { ERROR_MESSAGE } from '../constants/Messages.js';
import { validateRange, validateType } from './validate.js';

const validateUnit = (purchasePrice) => {
  if (purchasePrice % PURCHASE_PRICE.UNIT !== 0) {
    throw new Error(ERROR_MESSAGE.PURCHASE.INVALID_UNIT);
  }
};

const PurchasePriceValidator = {
  validate: (purchasePrice) => {
    validateType(KEY.PURCHASE_PRICE, purchasePrice);
    validateRange({
      key: KEY.PURCHASE_PRICE,
      value: purchasePrice,
      min: PURCHASE_PRICE.MIN,
      max: PURCHASE_PRICE.MAX,
    });
    validateUnit(purchasePrice);
  },
};

export { PurchasePriceValidator, validateUnit };
