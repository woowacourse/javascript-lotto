import { qs, on, emit } from '../utils/helper.js';

export default class LottoPurchaseInputView {
  constructor() {
    this.lottoPurchaseForm = qs('#lotto-purchase-form');
    this.lottoPurchaseInput = qs('#lotto-purchase-input');

    this.bindEvents();
  }

  bindEvents() {
    on(this.lottoPurchaseForm, 'submit', this.handlePurchaseLotto.bind(this));
  }

  cleanLottoPurchaseInput() {
    this.lottoPurchaseInput.value = '';
  }

  handlePurchaseLotto(event) {
    event.preventDefault();
    const purchaseMoney = this.lottoPurchaseInput.value;
    console.log(purchaseMoney)
    emit(this.lottoPurchaseForm, '@purchaseMoney', purchaseMoney);
  }
}
