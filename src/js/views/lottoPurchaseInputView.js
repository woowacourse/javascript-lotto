import { $, on, emit } from '../utils/helper.js';

export default class LottoPurchaseInputView {
  constructor() {
    this.lottoPurchaseForm = $('#lotto-purchase-form');
    this.lottoPurchaseInput = $('#lotto-purchase-input');

    this.attachEvents();
  }

  attachEvents() {
    on(this.lottoPurchaseForm, 'submit', this.handlePurchaseLotto.bind(this));
  }

  cleanLottoPurchaseInput() {
    this.lottoPurchaseInput.value = '';
  }

  handlePurchaseLotto(event) {
    event.preventDefault();
    const purchaseMoney = this.lottoPurchaseInput.valueAsNumber;
    emit(this.lottoPurchaseForm, '@purchaseMoney', purchaseMoney);
  }
}
