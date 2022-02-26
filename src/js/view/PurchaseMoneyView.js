import { convertToNumber } from '../util/common.js';
import { validatePurchaseMoney } from '../util/validator.js';

export default class PurchaseMoneyView {
  constructor() {
    this.form = document.getElementById('purchase-money-form');
    this.input = document.getElementById('purchase-money-input');
  }

  addSubmitEvent(submitHandler) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const purchaseMoney = convertToNumber(this.input.value);

      try {
        validatePurchaseMoney(purchaseMoney);
        submitHandler(purchaseMoney);
      } catch (error) {
        this.resetInputValue();
        alert(error);
      }
    });
  }

  resetInputValue() {
    this.input.value = '';
  }
}
