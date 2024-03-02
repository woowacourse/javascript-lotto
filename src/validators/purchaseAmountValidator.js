import { ERROR_MESSAGE } from '../constants/message.js';
import CONFIG from '../constants/config.js';
import numberValidator from './numberValidator.js';

const purchaseAmountValidator = {
  validate(purchaseAmount) {
    numberValidator.validate(purchaseAmount);
    this.validateUnitAmount(purchaseAmount);
  },

  validateUnitAmount(purchaseAmount) {
    if (purchaseAmount % CONFIG.PURCHASE_UNIT !== 0) {
      throw new Error(ERROR_MESSAGE.PURCHASE_AMOUNT_UNIT);
    }
  },
};

export default purchaseAmountValidator;
