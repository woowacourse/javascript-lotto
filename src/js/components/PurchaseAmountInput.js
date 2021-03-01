import { $, disable, enable } from '../utils/DOM.js';
import { PURCHASE_AMOUNT_SUBMITTED, APP_RESET } from '../constants/appStages.js';
import { MONETARY_UNIT, LOTTO_PRICE } from '../constants/lottoRules.js';
import { PURCHASE_AMOUNT_ALERT_MESSAGE } from '../constants/display.js';

const validateInput = (purchaseAmount) => {
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

  return {
    isError: false,
    message: '',
  };
};
export default class PurchaseAmountInput {
  constructor({ stageManager, lottoManager }) {
    this.stageManager = stageManager;
    this.lottoManager = lottoManager;

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
    this.stageManager.subscribe(PURCHASE_AMOUNT_SUBMITTED, this.deactivate.bind(this));
    this.stageManager.subscribe(APP_RESET, this.resetSection.bind(this));
  }

  attachEvent() {
    this.$purchaseAmountForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.onSubmitPurchaseAmount();
    });
  }

  onSubmitPurchaseAmount() {
    const purchaseAmount = this.$purchaseAmountInput.value;
    const { isError, message } = validateInput(purchaseAmount);

    if (isError) {
      this.requestValidInput(message);
      return;
    }

    const change = purchaseAmount % LOTTO_PRICE;

    if (change > 0) {
      alert(PURCHASE_AMOUNT_ALERT_MESSAGE.PURCHASE_AMOUNT_HAS_CHANGE(change));
    }
    this.lottoManager.setStates({ numOfLotto: (purchaseAmount - change) / LOTTO_PRICE });
    this.stageManager.setStates({ stage: PURCHASE_AMOUNT_SUBMITTED });
  }

  requestValidInput(errorMessage) {
    alert(errorMessage);
    this.$purchaseAmountForm.reset();
    this.$purchaseAmountInput.focus();
  }

  deactivate() {
    disable(this.$purchaseAmountInput);
    disable(this.$purchaseAmountButton);
  }

  resetSection() {
    this.$purchaseAmountForm.reset();
    enable(this.$purchaseAmountInput);
    enable(this.$purchaseAmountButton);
  }
}
