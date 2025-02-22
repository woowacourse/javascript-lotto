import { PURCHASE_NUMBER_ERROR_MESSAGES } from '../../constants/constants.js';
import runValidators from '../../utils/runValidators.js';
import { numberUtils } from '../utils/numberUtils.js';
import { LOTTO_CONDITION } from '../../constants/constants.js';

const purchaseMoneyValidator = {
  isValidUnit(input) {
    return input % LOTTO_CONDITION.PRICE === 0;
  },

  isValidRange(input) {
    return LOTTO_CONDITION.PRICE <= input;
  },
};

const validatePurchaseMoneyInteger = (input) => {
  if (!numberUtils.isInteger(input)) {
    throw new Error(PURCHASE_NUMBER_ERROR_MESSAGES.INTIGER);
  }
};

const validateUnit = (input) => {
  if (!purchaseMoneyValidator.isValidUnit(input)) {
    throw new Error(PURCHASE_NUMBER_ERROR_MESSAGES.UNIT);
  }
};

const validateRange = (input) => {
  if (!purchaseMoneyValidator.isValidRange(input)) {
    throw new Error(PURCHASE_NUMBER_ERROR_MESSAGES.MIN);
  }
};

const validatePurchaseMoney = (input) =>
  runValidators([validatePurchaseMoneyInteger, validateRange, validateUnit], input);

export default validatePurchaseMoney;
