import { MESSAGE } from '../utils/constants.js';
import { qs, on, newCustomEvent } from '../utils/helper.js';

export default class LottoPurchaseInputView {
  constructor() {
    this.lottoPurchaseForm = qs('#lotto-purchase-form');
    this.lottoPurchaseInput = qs('#lotto-purchase-input');
    this.purchaseMoneyValidateText = qs('#purchase-validate-text');

    this.bindEvents();
  }

  bindEvents() {
    on(this.lottoPurchaseInput, 'input', this.handlePurchaseLottoInput.bind(this));
    on(this.lottoPurchaseForm, 'submit', this.handlePurchaseLotto.bind(this));
  }

  cleanLottoPurchaseInput() {
    this.lottoPurchaseInput.value = '';
    this.purchaseMoneyValidateText.textContent = '';
  }

  handlePurchaseLottoInput(event) {
    const purchaseMoney = event.target.value;
    newCustomEvent(this.lottoPurchaseInput, '@purchaseMoney', purchaseMoney);
  }

  handlePurchaseLotto(event) {
    event.preventDefault();
    const purchaseMoney = this.lottoPurchaseInput.value;
    newCustomEvent(this.lottoPurchaseForm, '@purchaseMoney', purchaseMoney);
  }

  insertPurchaseValidateText(errorMessage) {
    errorMessage === MESSAGE.CAN_PURCHASE_LOTTO 
      ? this.purchaseMoneyValidateText.style.color = 'green' 
      : this.purchaseMoneyValidateText.style.color = 'red';
    this.purchaseMoneyValidateText.textContent = errorMessage;
  }
  
}
