import { MONETARY_UNIT, ALERT_MESSAGE, LOTTO_PRICE } from '../constants.js';
import { $, clearInputValue } from '../utils/DOM.js';

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
    const errorMessage = this.validateInput(purchaseAmount);

    if (errorMessage) {
      alert(errorMessage);
      clearInputValue(this.$purchaseAmountInput);
      this.$purchaseAmountInput.focus();

      return;
    }

    const change = purchaseAmount % LOTTO_PRICE;

    if (change) {
      alert(ALERT_MESSAGE.PURCHASE_AMOUNT_HAS_CHANGE(change));
    }

    this.createLottoTickets((purchaseAmount - change) / LOTTO_PRICE);
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
