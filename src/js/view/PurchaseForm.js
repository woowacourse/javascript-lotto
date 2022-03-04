import { $ } from '../utils/dom.js';
import { ID_SELECTOR } from '../constants.js';
export default class PurchaseFormView {
  constructor() {
    this.#configureDOM();
    this.bindInput();
  }

  #configureDOM() {
    this.$purchaseForm = $(ID_SELECTOR.PURCHASE_FORM);
    this.$purchaseInput = $(ID_SELECTOR.PURCHASE_INPUT);
  }

  clearInput() {
    this.$purchaseForm.reset();
  }

  bindSubmitCash(handler) {
    this.$purchaseForm.addEventListener('submit', event => {
      event.preventDefault();
      handler(makeNumberWithoutComma(event.target.elements.cash.value));
    });
  }

  bindInput() {
    this.$purchaseInput.addEventListener('keypress', ({ target }) => {
      if (target.value === '') {
        return;
      }
      target.value = makeNumberWithoutComma(target.value).toLocaleString();
    });
  }
}

function makeNumberWithoutComma(value) {
  return Number(value.replace(/,/g, ''));
}
