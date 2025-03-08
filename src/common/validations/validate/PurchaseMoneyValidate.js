import { PURCHASE_NUMBER_ERROR_MESSAGES } from '../../constants/constants.js';
import runValidators from '../../utils/runValidators.js';
import { PurchaseMoneyValidator } from '../validator/PurchaseMoneyValidator.js';

const validatePurchaseMoneyInteger = (input) => {
  if (!PurchaseMoneyValidator.isInteger(input)) {
    throw new Error(PURCHASE_NUMBER_ERROR_MESSAGES.INTIGER);
  }
};

const validateUnit = (input) => {
  if (!PurchaseMoneyValidator.isValidUnit(input)) {
    throw new Error(PURCHASE_NUMBER_ERROR_MESSAGES.UNIT);
  }
};

const validateRange = (input) => {
  if (!PurchaseMoneyValidator.isValidRange(input)) {
    throw new Error(PURCHASE_NUMBER_ERROR_MESSAGES.MIN);
  }
};

const validatePurchaseMoney = (input) =>
  runValidators([validatePurchaseMoneyInteger, validateRange, validateUnit], input);

export default validatePurchaseMoney;
