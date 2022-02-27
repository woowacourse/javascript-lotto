import View from './View.js';

import { convertToNumber } from '../utils/common.js';
import { validatePurchaseMoney } from '../utils/validator.js';

export default class PurchaseMoneyView extends View {
  constructor() {
    super();

    //멤버변수 초기화
    this.form = document.getElementById('purchase-money-form');
    this.input = document.getElementById('purchase-money-input');

    //이벤트
    this.form.addEventListener('submit', this.submitHandler.bind(this));
  }

  submitHandler(e) {
    e.preventDefault();

    const purchaseMoney = convertToNumber(this.input.value);

    try {
      validatePurchaseMoney(purchaseMoney);
      this.handlers
        .get('purchasedMoneySubmit')
        .forEach(func => func(purchaseMoney));
    } catch (error) {
      this.resetInputValue();
      alert(error);
    }
  }

  resetInputValue() {
    this.input.value = '';
  }
}
