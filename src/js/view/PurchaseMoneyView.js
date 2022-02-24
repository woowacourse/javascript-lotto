import { convertToNumber } from '../utils/common.js';

export default class PurchaseMoneyView {
  constructor() {
    this.initDom();
  }

  initDom() {
    this.form = document.getElementById('purchase-money-form');
    this.input = document.getElementById('purchase-money-input');
  }

  addSubmitEvent(submitHandler) {
    this.form.addEventListener('submit', e => {
      e.preventDefault();

      const purchaseMoney = convertToNumber(this.input.value);

      submitHandler(purchaseMoney);
    });
  }

  resetInputValue() {
    this.input.value = '';
  }
}
