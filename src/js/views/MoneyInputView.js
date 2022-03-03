import { SELECTOR } from '../constants/selector';

import { $ } from '../utils/element-manager';
import { onEnableButton } from '../utils/custom-event';

export default class MoneyInputView {
  #container;
  #moneyInput;
  #moneyInputSubmit;

  constructor(containerSelector) {
    this.#container = $(containerSelector);

    this.#defaultElements();
    this.#bindViewEvents();
  }

  #defaultElements() {
    this.#moneyInput = $(this.#container, `#${SELECTOR.ID.LOTTO_MONEY_INPUT}`);
    this.#moneyInputSubmit = $(this.#container, `#${SELECTOR.ID.LOTTO_PURCHASE_BUTTON}`);
  }

  #bindViewEvents() {
    this.#moneyInput.addEventListener('keyup', this.#handleMoneyInputValue.bind(this));
  }

  init() {
    this.#moneyInput.value = '';
    this.#handleMoneyInputValue();
  }

  #handleMoneyInputValue() {
    const isInputEmpty = this.#moneyInput.value.length === 0;
    onEnableButton(this.#moneyInputSubmit, () => isInputEmpty === false);
  }

  bindInputSubmit(handler) {
    this.#moneyInputSubmit.addEventListener('click', (event) => {
      event.preventDefault();
      handler({ moneyInputValue: this.#moneyInput.value });
    });
  }
}
