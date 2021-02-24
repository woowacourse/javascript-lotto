import { lottoManager } from './App.js';
import {
  $,
  clearInputValue,
  disableElements,
  enableElements,
} from '../utils/dom.js';
import { LOTTO } from '../utils/constants.js';
import { mod, divide, isEmptyArray } from '../utils/common.js';
import { ERROR_MESSAGE, GUIDE_MESSAGE } from '../utils/message.js';

export default class LottoPurchaseInput {
  constructor() {
    this.subscribeAction();
    this.selectDOM();
    this.bindEvent();
  }

  subscribeAction() {
    lottoManager.subscribe(this.reset.bind(this));
  }

  selectDOM() {
    this.$target = $('#lotto-purchase-input-container');
    this.$purchaseInput = $('#lotto-purchase-input');
    this.$purchaseButton = $('#lotto-purchase-btn');
  }

  bindEvent() {
    this.$target.addEventListener('submit', e => {
      e.preventDefault();

      this.onPurchaseLotto();
    });
  }

  onPurchaseLotto() {
    const purchaseInputValue = this.$purchaseInput.value.trim();
    const payment = Number(purchaseInputValue);

    const errorMessage = validatePurchaseInputValue(payment);
    if (errorMessage) {
      alert(errorMessage);
      clearInputValue(this.$purchaseInput);
      return;
    }

    const lottoCount = divide(payment, LOTTO.PRICE);
    const remainingMoney = mod(payment, LOTTO.PRICE);
    alert(GUIDE_MESSAGE.PAYMENT_RESULT_MESSAGE(lottoCount, remainingMoney));

    disableElements(this.$purchaseInput, this.$purchaseInput);
    lottoManager.createLottos(lottoCount);
  }

  reset() {
    if (isEmptyArray(lottoManager.lottos)) {
      clearInputValue(this.$purchaseInput);
      enableElements(this.$purchaseInput, this.$purchaseButton);
    }
  }
}

const validatePurchaseInputValue = payment => {
  if (payment < LOTTO.PRICE) {
    return ERROR_MESSAGE.PAYMENT_AMOUNT;
  }
};
