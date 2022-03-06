import { $ } from '../utils/dom.js';
import { ID } from '../constants/attribute.js';
import { REGEXP } from '../constants/regexp.js';
export default class PurchaseFormView {
  constructor() {
    this.#configureDOM();
    this.bindAddCommaInNumber();
  }

  #configureDOM() {
    this.$purchaseForm = $(ID.PURCHASE_FORM);
    this.$purchaseInput = $(ID.PURCHASE_INPUT);
    this.$purchaseSubmit = $(ID.PURCHASE_SUBMIT);
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
    let valueAfterKeyDown;
    this.$purchaseInput.addEventListener('keydown', e => {
      if (REGEXP.NOT_NUMBER.test(e.key) && e.key.length === 1) {
        e.preventDefault();
        return;
      }

      if (REGEXP.KOREAN.test(e.key)) {
        valueAfterKeyDown = e.target.value;
        return;
      }
    });

    this.$purchaseInput.addEventListener('input', e => {
      const value = e.target.value;
      if (REGEXP.KOREAN.test(value)) {
        e.target.value = valueAfterKeyDown;
        return;
      }

      if (value === '') {
        return;
      }

      e.target.value = removeCommaInNumber(value).toLocaleString();
    });
  }

  disableSubmit() {
    this.$purchaseInput.disabled = true;
    this.$purchaseSubmit.disabled = true;
  }

  enableSubmit() {
    this.$purchaseInput.disabled = false;
    this.$purchaseSubmit.disabled = false;
  }
}

function removeCommaInNumber(value) {
  return Number(value.replace(/,/g, ''));
}
