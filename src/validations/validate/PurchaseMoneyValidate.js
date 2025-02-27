import { PURCHASE_NUMBER_ERROR_MESSAGES } from '../../constants/constants.js';
import runValidators from '../../utils/runValidators.js';
import { PurchaseMoneyValidator } from '../validator/PurchaseMoneyValidator.js';

const $purchaseFormError = document.getElementById('purchase-form__error');

const validatePurchaseMoneyInteger = (input) => {
  if (!PurchaseMoneyValidator.isInteger(input)) {
    $purchaseFormError.textContent = PURCHASE_NUMBER_ERROR_MESSAGES.INTIGER;

    throw new Error(PURCHASE_NUMBER_ERROR_MESSAGES.INTIGER);
  }
};

const validateUnit = (input) => {
  if (!PurchaseMoneyValidator.isValidUnit(input)) {
    $purchaseFormError.textContent = PURCHASE_NUMBER_ERROR_MESSAGES.UNIT;

    throw new Error(PURCHASE_NUMBER_ERROR_MESSAGES.UNIT);
  }
};

const validateRange = (input) => {
  if (!PurchaseMoneyValidator.isValidRange(input)) {
    $purchaseFormError.textContent = PURCHASE_NUMBER_ERROR_MESSAGES.MIN;

    throw new Error(PURCHASE_NUMBER_ERROR_MESSAGES.MIN);
  }
};

const validatePurchaseMoney = (input) =>
  runValidators([validatePurchaseMoneyInteger, validateRange, validateUnit], input);

export default validatePurchaseMoney;
