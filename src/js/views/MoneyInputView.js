import { $ } from '../utils/element-manager.js';

export default class MoneyInputView {
  #container;
  constructor($element) {
    this.#container = $element;
  }

  bindMoneyInputSubmit(handler) {
    const $container = this.#container;

    $($container, '#lotto-purchase-button').addEventListener('click', (event) => {
      event.preventDefault();
      handler({ moneyInput: $($container, '#lotto-money-input').value });
    });
  }
}
