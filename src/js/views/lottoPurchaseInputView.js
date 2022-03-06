import { $, on, emit } from '../utils/helper.js';

export default class LottoPurchaseInputView {
  #lottoPurchase;

  constructor() {
    this.#lottoPurchase = {
      form: $('#lotto-purchase-form'),
      input: $('#lotto-purchase-input'),
      button: $('#lotto-purchase-button'),
    };

    this.#attachEvents();
  }

  get lottoPurchaseForm() {
    return this.#lottoPurchase.form;
  }

  #attachEvents() {
    on(this.#lottoPurchase.form, 'submit', this.#handlePurchaseLotto.bind(this));
  }

  #handlePurchaseLotto(event) {
    event.preventDefault();
    const purchaseMoney = event.target.elements['lotto-purchase-input'].valueAsNumber;

    emit(this.#lottoPurchase.form, '@purchaseMoney', purchaseMoney);
  }

  reset() {
    this.#lottoPurchase.form.reset();
  }

  disableForm() {
    this.#lottoPurchase.input.disabled = true;
    this.#lottoPurchase.button.disabled = true;
  }

  restart() {
    this.reset();

    this.#lottoPurchase.input.disabled = false;
    this.#lottoPurchase.button.disabled = false;
  }
}
