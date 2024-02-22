import { ERROR_MESSAGE } from '../constants/message';
import numberValidator from './numberValidator';

const purchaseAmountValidator = {
  validate(purchaseAmount) {
    numberValidator.validate(purchaseAmount);
    this.validateUnitAmount(purchaseAmount);
  },

  validateUnitAmount(purchaseAmount) {
    if (purchaseAmount % 1000 !== 0) {
      throw new Error(ERROR_MESSAGE.PURCHASE_AMOUNT_UNIT);
    }
  },
};

export default purchaseAmountValidator;
