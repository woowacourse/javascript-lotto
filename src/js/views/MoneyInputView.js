import { $ } from '../utils/element-manager';
import { SELECTOR } from '../constants/selector';

export default class MoneyInputView {
  #container;
  #moneyInput;

  constructor($element) {
    this.#container = $element;

    this.#moneyInput = $($element, `#${SELECTOR.ID.LOTTO_MONEY_INPUT}`);
  }

  init() {
    this.#moneyInput.value = '';
  }

  bindMoneyInputSubmit(handler) {
    const $container = this.#container;

    $($container, `#${SELECTOR.ID.LOTTO_PURCHASE_BUTTON}`).addEventListener('click', (event) => {
      event.preventDefault();
      handler({ moneyInputValue: this.#moneyInput.value });
    });
  }
}
