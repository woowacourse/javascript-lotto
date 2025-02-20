import { PURCHASE_NUMBER_ERROR_MESSAGES } from '../../constants/constants.js';
import runValidators from '../../utils/runValidators.js';
import { purchaseMoneyValidator } from '../validator/purchaseMoneyValidator.js';

const validatePurchaseMoneyInteger = (input) => {
  if (!purchaseMoneyValidator.isInteger(input)) {
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
