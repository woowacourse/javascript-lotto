import { $ } from '../utils/dom.js';
import { ID_SELECTOR } from '../constants.js';
export default class PurchaseFormView {
  constructor() {
    this.configureDOM();
  }

  configureDOM() {
    this.$purchaseForm = $(ID_SELECTOR.PURCHASE_FORM);
    this.$purchaseInput = $(ID_SELECTOR.PURCHASE_INPUT, this.$purchaseForm);
  }

  setOnSubmitCash(fn) {
    this.$purchaseForm.addEventListener('submit', event => {
      event.preventDefault();
      fn(this.$purchaseInput.value);
    });
  }
}
