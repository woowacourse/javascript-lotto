import { $ } from '../utils/element-manager';
import { SELECTOR } from '../constants/selector';

export default class MoneyInputView {
  #container;
  #moneyInput;
  #moneyInputSubmit;

  constructor(containerSelector) {
    this.#container = $(containerSelector);

    this.#moneyInput = $(this.#container, `#${SELECTOR.ID.LOTTO_MONEY_INPUT}`);
    this.#moneyInputSubmit = $(this.#container, `#${SELECTOR.ID.LOTTO_PURCHASE_BUTTON}`);
  }

  init() {
    this.#moneyInput.value = '';
    this.disableSubmitButton();
  }

  enableSubmitButton() {
    this.#moneyInputSubmit.disabled = false;
  }

  disableSubmitButton() {
    this.#moneyInputSubmit.disabled = true;
  }

  bindInputKey(handler) {
    this.#moneyInput.addEventListener('keyup', () => {
      handler({ isEmpty: this.#moneyInput.value.length === 0 });
    });
  }

  bindInputSubmit(handler) {
    this.#moneyInputSubmit.addEventListener('click', (event) => {
      event.preventDefault();
      handler({ moneyInputValue: this.#moneyInput.value });
    });
  }
}
