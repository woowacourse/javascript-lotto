import { SELECTOR } from '../constants/selector';

import { $ } from '../utils/element-manager';
import { addEventOnce, onEnableButton } from '../utils/custom-event';

export default class MoneyInputView {
  #container;
  #moneyInput;
  #moneyInputErrorMessage;
  #moneyInputSubmit;

  constructor(containerSelector) {
    this.#container = $(containerSelector);

    this.#defaultElements();
    this.#bindViewEvents();

    this.init();
  }

  #defaultElements() {
    this.#moneyInput = $(this.#container, SELECTOR.LOTTO_MONEY_INPUT);
    this.#moneyInputSubmit = $(this.#container, SELECTOR.LOTTO_PURCHASE_BUTTON);
    this.#moneyInputErrorMessage = $(this.#container, '.error-message');
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

  renderMoneyInputError(message) {
    this.#moneyInput.classList.add('error');
    this.#moneyInputErrorMessage.classList.add('show');
    this.#moneyInputErrorMessage.textContent = message;

    addEventOnce('change', this.#moneyInput, () => {
      this.#moneyInput.classList.remove('error');
      this.#moneyInputErrorMessage.classList.remove('show');
    });
  }

  bindMoneyInputSubmit(handler) {
    this.#moneyInputSubmit.addEventListener('click', (event) => {
      event.preventDefault();
      handler({ moneyInputValue: this.#moneyInput.value });
    });
  }
}
