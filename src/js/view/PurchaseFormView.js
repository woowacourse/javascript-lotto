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
    let tmp;
    this.$purchaseInput.addEventListener('keydown', e => {
      if (REGEXP.NOT_NUMBER.test(e.key) && e.key.length === 1) {
        e.preventDefault();
        return;
      }
    });

    this.$purchaseInput.addEventListener('input', e => {});

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
