import OPTIONS from '../constant/Options.js';
import { validate2, validations } from '../util/validation.js';

const purchaseFormSubmitListener = (event) => {
  event.preventDefault();

  const purchaseAmountInput = event.target.elements['input'].value;
  const purchaseAmount = Number(purchaseAmountInput);

  validatePurchaseAmount(purchaseAmount);

  return purchaseAmount;
};

const validatePurchaseAmount = (purchaseAmount) => {
  const name = '구입 금액';
  validate2(validations.isInteger, purchaseAmount, name);
  validate2(validations.isAtLeast, purchaseAmount, OPTIONS.LOTTO.price, name);
};

export default purchaseFormSubmitListener;
