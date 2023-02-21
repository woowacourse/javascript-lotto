import { QuerySelector } from '../constants/HTML.js';

class Input {
  constructor() {
    this.moneyInputEl = document.querySelector(QuerySelector.MONEY_INPUT);
    this.purchaseBtn = document.querySelector(QuerySelector.PURCHASE_BUTTON);
  }

  purchaseLottos = (callback) => {
    this.purchaseBtn.addEventListener('click', () => {
      callback(this.moneyInputEl.value);
    });
  };
}

export default Input;
