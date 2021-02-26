import { $, clearInputValue } from '../utils/DOM.js';
import { LOTTO_PRICE, MONETARY_UNIT, PURCHASE_AMOUNT_ALERT_MESSAGE } from '../constants.js';

export default class PurchaseAmountInput {
  constructor({ createLottoTickets }) {
    this.$purchaseAmountForm = $('.purchase-amount-form');
    this.$purchaseAmountInput = $('.purchase-amount-input');
    this.$purchaseAmountButton = $('.purchase-amount-button');
    this.createLottoTickets = createLottoTickets;

    this.attachEvents();
  }

  attachEvents() {
    this.$purchaseAmountForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onSubmitPurchaseAmount();
    });
  }

  onSubmitPurchaseAmount() {
    const purchaseAmount = this.$purchaseAmountInput.value;
    const { isError, message, change } = this.validatePurchaseAmount(purchaseAmount);

    if (isError) {
      alert(message);
      clearInputValue(this.$purchaseAmountInput);
      this.$purchaseAmountInput.focus();
      return;
    }

    if (change > 0) {
      alert(message);
    }
    this.createLottoTickets((purchaseAmount - change) / LOTTO_PRICE);
  }

  validatePurchaseAmount(purchaseAmount) {
    if (purchaseAmount % MONETARY_UNIT) {
      return {
        isError: true,
        message: PURCHASE_AMOUNT_ALERT_MESSAGE.PURCHASE_AMOUNT_IS_INVALID_MONEY,
      };
    }

    if (purchaseAmount < LOTTO_PRICE) {
      return {
        isError: true,
        message: PURCHASE_AMOUNT_ALERT_MESSAGE.PURCHASE_AMOUNT_IS_TOO_LOW,
      };
    }

    const change = purchaseAmount % LOTTO_PRICE;

    return {
      isError: false,
      message: PURCHASE_AMOUNT_ALERT_MESSAGE.PURCHASE_AMOUNT_HAS_CHANGE(change),
      change,
    };
  }

  reset() {
    clearInputValue(this.$purchaseAmountInput);
  }
}
