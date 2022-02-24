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

  handlePurchaseLotto(event) {
    event.preventDefault();
    const purchaseMoney = this.lottoPurchaseInput.valueAsNumber;
    emit(this.lottoPurchaseForm, '@purchaseMoney', purchaseMoney);
  }
}
