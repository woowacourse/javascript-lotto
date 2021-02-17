import { MONETARY_UNIT, ALERT_MESSAGE, LOTTO_PRICE } from '../constants.js';
import { $, clearInput } from '../utils/DOM.js';

export default class PurchaseAmountInput {
  constructor() {
    this.$purchaseAmountInput = $('.purchase-amount-input');
    this.$purchaseAmountButton = $('.purchase-amount-button');

    this.attachEvents();
  }

  attachEvents() {
    this.$purchaseAmountButton.addEventListener(
      'click',
      this.onSubmitPurchaseAmount.bind(this)
    );
  }

  onSubmitPurchaseAmount() {
    const purchaseAmount = this.$purchaseAmountInput.value;
    const errorMessage = this.validateInput(purchaseAmount);

    if (errorMessage) {
      alert(errorMessage);
      clearInput(this.$purchaseAmountInput);
      this.$purchaseAmountInput.focus();

      return;
    }
  }

  validateInput(purchaseAmount) {
    if (purchaseAmount % MONETARY_UNIT) {
      return ALERT_MESSAGE.PURCHASE_AMOUNT_IS_INVALID_MONEY;
    }

    if (purchaseAmount < LOTTO_PRICE) {
      return ALERT_MESSAGE.PURCHASE_AMOUNT_IS_TOO_LOW;
    }

    return '';
  }
}
