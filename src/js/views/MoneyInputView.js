import { $ } from '../utils/element-manager';
import { SELECTOR } from '../constants/selector';

export default class MoneyInputView {
  #$container;

  constructor($element) {
    this.#$container = $element;
  }

  bindMoneyInputSubmit(handler) {
    const $container = this.#$container;

    $($container, `#${SELECTOR.ID.LOTTO_PURCHASE_BUTTON}`).addEventListener('click', (event) => {
      event.preventDefault();
      handler({ money: Number($($container, `#${SELECTOR.ID.LOTTO_MONEY_INPUT}`).value) });
    });
  }

  disableNewMoneySubmit() {
    $(this.#$container, `#${SELECTOR.ID.LOTTO_MONEY_INPUT}`).disabled = true;
    $(this.#$container, `#${SELECTOR.ID.LOTTO_PURCHASE_BUTTON}`).disabled = true;
  }

  reset() {
    $(this.#$container, `#${SELECTOR.ID.LOTTO_MONEY_INPUT}`).disabled = false;
    $(this.#$container, `#${SELECTOR.ID.LOTTO_PURCHASE_BUTTON}`).disabled = false;
    $(this.#$container, `#${SELECTOR.ID.LOTTO_MONEY_INPUT}`).value = '';
  }
}
