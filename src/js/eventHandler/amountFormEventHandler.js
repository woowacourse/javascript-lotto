import OPTIONS from '../constant/Options.js';
import { validate2, validations } from '../util/validation.js';

const amountFormEventHandler = (event) => {
  event.preventDefault();

  const purchaseAmountInput = document.querySelector('.amount-form__input').value;
  const purchaseAmount = Number(purchaseAmountInput);

  validatePurchaseAmount(purchaseAmount);

  return purchaseAmount;
};

const validatePurchaseAmount = (purchaseAmount) => {
  validate2(validations.isInteger, purchaseAmount, '구매금액');
  validate2(validations.isAtLeast, purchaseAmount, OPTIONS.LOTTO.price, '구매금액');
};

export default amountFormEventHandler;
