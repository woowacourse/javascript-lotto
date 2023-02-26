import { QuerySelector } from '../constants/Dom';
import { $ } from '../utils/DomUtils';

class MoneyInput {
  constructor() {
    this.moneyInputEl = $(QuerySelector.MONEY_INPUT);
    this.purchaseBtn = $(QuerySelector.PURCHASE_BUTTON);
  }

  activate(purchaseLottos) {
    this.purchaseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const money = this.moneyInputEl.value;
      this.purchaseBtn.setAttribute('disabled', '');
      purchaseLottos(money);
    });
  }

  reset() {
    this.moneyInputEl.value = '';
    this.purchaseBtn.removeAttribute('disabled');
    this.moneyInputEl.focus();
  }
}

export default new MoneyInput();
