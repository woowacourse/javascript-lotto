import { CONFIG_LOTTO } from '../constants/config';
import { ERROR_MESSAGE } from '../constants/message';
import numberValidator from './numberValidator';

const purchaseAmountValidator = {
  validate(purchaseAmount) {
    numberValidator.validate(purchaseAmount);
    this.validateUnitAmount(purchaseAmount);
  },

  validateUnitAmount(purchaseAmount) {
    if (purchaseAmount % CONFIG_LOTTO.PURCHASE_UNIT !== 0) {
      throw new Error(ERROR_MESSAGE.PURCHASE_AMOUNT_UNIT);
    }
  },
};

export default purchaseAmountValidator;
