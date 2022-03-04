import { $ } from '../utils/dom.js';
import { ID_SELECTOR } from '../constants.js';
export default class PurchaseFormView {
  constructor() {
    this.#configureDOM();
    this.bindAddCommaInNumber();
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
      handler(removeCommaInNumber(event.target.elements.cash.value));
    });
  }

  bindAddCommaInNumber() {
    this.$purchaseInput.addEventListener('keyup', ({ target }) => {
      if (target.value === '') {
        return;
      }
      target.value = removeCommaInNumber(target.value).toLocaleString();
    });
  }
}

function removeCommaInNumber(value) {
  return Number(value.replace(/,/g, ''));
}
