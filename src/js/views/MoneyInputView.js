import { $ } from '../utils/element-manager.js';
import { SELECTOR } from '../constants/selector.js';

export default class MoneyInputView {
  #container;
  constructor($element) {
    this.#container = $element;
  }

  bindMoneyInputSubmit(handler) {
    const $container = this.#container;

    $($container, `#${SELECTOR.ID.LOTTO_PURCHASE_BUTTON}`).addEventListener('click', (event) => {
      event.preventDefault();
      handler({ moneyInput: $($container, `#${SELECTOR.ID.LOTTO_MONEY_INPUT}`).value });
    });
  }
}
