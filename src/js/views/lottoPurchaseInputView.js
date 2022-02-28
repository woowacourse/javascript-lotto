import { $, on, emit } from '../utils/helper.js';

export default class LottoPurchaseInputView {
  #lottoPurchaseForm;

  #lottoPurchaseInput;

  #lottoPurchaseButton;

  constructor() {
    this.#lottoPurchaseForm = $('#lotto-purchase-form');
    this.#lottoPurchaseInput = $('#lotto-purchase-input');
    this.#lottoPurchaseButton = $('#lotto-purchase-button');

    this.#attachEvents();
  }

  get lottoPurchaseForm() {
    return this.#lottoPurchaseForm;
  }

  #attachEvents() {
    on(this.#lottoPurchaseForm, 'submit', this.#handlePurchaseLotto.bind(this));
  }

  #handlePurchaseLotto(event) {
    event.preventDefault();
    const purchaseMoney = this.#lottoPurchaseInput.valueAsNumber;

    emit(this.#lottoPurchaseForm, '@purchaseMoney', purchaseMoney);
  }

  resetPurchaseMoney() {
    this.#lottoPurchaseForm.reset();
  }

  disablePurchaseLottoForm() {
    this.#lottoPurchaseInput.disabled = true;
    this.#lottoPurchaseButton.disabled = true;
  }
}
