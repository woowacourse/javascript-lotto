import { $ } from '../utils/element-manager';
import { SELECTOR } from '../constants/selector';

export default class MoneyInputView {
  #container;
  #moneyInput;

  constructor(containerSelector) {
    this.#container = $(containerSelector);

    this.#moneyInput = $(this.#container, `#${SELECTOR.ID.LOTTO_MONEY_INPUT}`);
  }

  init() {
    this.#moneyInput.value = '';
  }

  enableInput() {}

  disableInput() {}

  bindInputKeypress(handler) {
    this.#moneyInput.addEventListener('keyup', (event) => {
      event.preventDefault();
      handler({ isEmpty: this.#moneyInput.value.length > 0 });
    });
  }

  bindInputSubmit(handler) {
    const $container = this.#container;

    $($container, `#${SELECTOR.ID.LOTTO_PURCHASE_BUTTON}`).addEventListener('click', (event) => {
      event.preventDefault();
      handler({ moneyInputValue: this.#moneyInput.value });
    });
  }
}
