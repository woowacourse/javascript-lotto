import { $ } from '../utils/element-manager';
import { SELECTOR } from '../constants/selector';

export default class MoneyInputView {
  #container;

  constructor($element) {
    this.#container = $element;
  }

  bindMoneyInputSubmit(handler) {
    const $container = this.#container;

    $($container, `#${SELECTOR.ID.LOTTO_PURCHASE_BUTTON}`).addEventListener('click', (event) => {
      event.preventDefault();
      handler({ money: $($container, `#${SELECTOR.ID.LOTTO_MONEY_INPUT}`).value });
    });
  }

  reset() {
    $(this.#container, '#lotto-money-input').value = '';
  }
}
