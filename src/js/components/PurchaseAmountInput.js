import { validatePurchaseAmount } from '../model/purchaseAmountValidator.js';
import { $, clearInputValue } from '../utils/DOM.js';
import { LOTTO_PRICE } from '../constants.js';

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
    const { isError, message, change } = validatePurchaseAmount(purchaseAmount);

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

  reset() {
    clearInputValue(this.$purchaseAmountInput);
  }
}
