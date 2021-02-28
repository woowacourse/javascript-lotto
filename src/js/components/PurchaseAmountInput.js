import { $, clearInputValue, disable, enable } from '../utils/DOM.js';
import { PURCHASE_AMOUNT_COMPLETED, APP_RESET } from '../constants/appStages.js';
import { MONETARY_UNIT, LOTTO_PRICE } from '../constants/lottoRules.js';
import { PURCHASE_AMOUNT_ALERT_MESSAGE } from '../constants/display.js';

export default class PurchaseAmountInput {
  constructor({ stageManager }) {
    this.stageManager = stageManager;
    this.checkMessage = '';

    this.selectDOMs();
    this.subscribeAppStages();
    this.attachEvent();
  }

  selectDOMs() {
    this.$purchaseAmountForm = $('.purchase-amount-form');
    this.$purchaseAmountInput = $('.purchase-amount-input');
    this.$purchaseAmountButton = $('.purchase-amount-button');
  }

  subscribeAppStages() {
    this.stageManager.subscribe(PURCHASE_AMOUNT_COMPLETED, this.deactivate.bind(this));
    this.stageManager.subscribe(APP_RESET, this.reset.bind(this));
  }

  attachEvent() {
    this.$purchaseAmountForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onSubmitPurchaseAmount();
    });
  }

  validateInput(purchaseAmount) {
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

  onSubmitPurchaseAmount() {
    const purchaseAmount = this.$purchaseAmountInput.value;
    const { isError, message } = this.validateInput(purchaseAmount);

    if (isError) {
      this.requestValidInput(message);
      return;
    }

    const change = purchaseAmount % LOTTO_PRICE;

    if (change > 0) {
      alert(PURCHASE_AMOUNT_ALERT_MESSAGE.PURCHASE_AMOUNT_HAS_CHANGE(change));
    }
    this.stageManager.setStates({
      stage: PURCHASE_AMOUNT_COMPLETED,
      numOfLotto: (purchaseAmount - change) / LOTTO_PRICE,
    });
  }

  requestValidInput(errorMessage) {
    alert(errorMessage);
    clearInputValue(this.$purchaseAmountInput);
    this.$purchaseAmountInput.focus();
  }

  deactivate() {
    disable(this.$purchaseAmountInput);
    disable(this.$purchaseAmountButton);
  }

  reset() {
    clearInputValue(this.$purchaseAmountInput);
    enable(this.$purchaseAmountInput);
    enable(this.$purchaseAmountButton);
  }
}
