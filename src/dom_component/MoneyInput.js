import { Attr, Event, QuerySelector } from '../constants/Dom';
import { $ } from '../utils/DomUtils';

class MoneyInput {
  constructor() {
    this.moneyInputEl = $(QuerySelector.MONEY_INPUT);
    this.purchaseBtn = $(QuerySelector.PURCHASE_BUTTON);
  }

  activate(purchaseLottos) {
    this.purchaseBtn.addEventListener(Event.CLICK, (e) => {
      e.preventDefault();
      const money = this.moneyInputEl.value;
      this.purchaseBtn.setAttribute(Attr.DISABLED, '');
      purchaseLottos(money);
    });
  }

  reset() {
    this.moneyInputEl.value = '';
    this.purchaseBtn.removeAttribute(Attr.DISABLED);
    this.moneyInputEl.focus();
  }
}

export default new MoneyInput();
