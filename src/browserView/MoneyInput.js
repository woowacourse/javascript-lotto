import { Event, QuerySelector } from '../constants/HTML';
import { $ } from '../utils/DomUtils';

class MoneyInput {
  constructor() {
    this.moneyInputEl = $(QuerySelector.MONEY_INPUT);
    this.purchaseBtn = $(QuerySelector.PURCHASE_BUTTON);
  }

  activate(purchaseLottos) {
    this.purchaseBtn.addEventListener(Event.CLICK, () => {
      const money = this.moneyInputEl.value;
      purchaseLottos(money);
    });
  }

  reset() {
    this.moneyInputEl.value = '';
  }
}

export default new MoneyInput();
