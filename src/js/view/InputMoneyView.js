import View from './View.js';

import { convertToNumber } from '../utils/common.js';
import { validatePurchaseMoney } from './validator.js';

export default class InputMoneyView extends View {
  constructor() {
    super();
    //멤버변수 초기화
    this.purchasedMoneyForm = document.getElementById('purchase-money-form');
    this.purchaseMoneyInput = document.getElementById('purchase-money-input');

    //이벤트리스너 등록
    this.purchasedMoneyForm.addEventListener(
      'submit',
      this.handlePurchasedMoneyFormSubmit.bind(this),
    );
  }

  handlePurchasedMoneyFormSubmit(e) {
    e.preventDefault();

    const purchaseMoney = convertToNumber(this.purchaseMoneyInput.value);

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
    this.purchaseMoneyInput.value = '';
  }
}
