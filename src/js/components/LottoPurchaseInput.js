import { $, clearInputValue } from '../utils/DOM.js';
import { PURCHASE_AMOUNT_COMPLETED, APP_RESET } from '../constants/appStages.js';
import { MONETARY_UNIT, LOTTO_PRICE } from '../constants/lottoRules.js';
import { PURCHASE_AMOUNT_ALERT_MESSAGE } from '../constants/display.js';

export default class LottoPurchaseInput {
  constructor({ lottoManager }) {
    this.lottoManager = lottoManager;

    this.selectDOM();
    this.subscribe();
    this.attachEvent();
  }

  selectDOM() {
    this.$purchaseAmountForm = $('.purchase-amount-form');
    this.$purchaseAmountInput = $('.purchase-amount-input');
    this.$purchaseAmountButton = $('.purchase-amount-button');
  }

  subscribe() {
    this.lottoManager?.subscribe(APP_RESET, this.resetPurchaseAmountInput.bind(this));
  }

  attachEvent() {
    this.$purchaseAmountForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onSubmitPurchaseAmount();
    });
  }

  validateInput(purchaseAmount) {
    if (purchaseAmount % MONETARY_UNIT) {
      return PURCHASE_AMOUNT_ALERT_MESSAGE.PURCHASE_AMOUNT_IS_INVALID_MONEY;
    }

    if (purchaseAmount < LOTTO_PRICE) {
      return PURCHASE_AMOUNT_ALERT_MESSAGE.PURCHASE_AMOUNT_IS_TOO_LOW;
    }

    return '';
  }

  onSubmitPurchaseAmount() {
    const purchaseAmount = this.$purchaseAmountInput.value;
    const errorMessage = this.validateInput(purchaseAmount);

    if (errorMessage) {
      this.requestValidInput(errorMessage);
      return;
    }

    const change = purchaseAmount % LOTTO_PRICE;

    if (change > 0) {
      alert(PURCHASE_AMOUNT_ALERT_MESSAGE.PURCHASE_AMOUNT_HAS_CHANGE(change));
    }

    this.lottoManager.setStates({
      stage: PURCHASE_AMOUNT_COMPLETED,
      numOfLotto: (purchaseAmount - change) / LOTTO_PRICE,
    });
  }

  requestValidInput(errorMessage) {
    alert(errorMessage);
    clearInputValue(this.$purchaseAmountInput);
    this.$purchaseAmountInput.focus();
  }

  resetPurchaseAmountInput() {
    clearInputValue(this.$purchaseAmountInput);
  }
}
