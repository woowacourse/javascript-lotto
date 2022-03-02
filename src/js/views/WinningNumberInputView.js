import { $, $$ } from '../utils/element-manager';
import { SELECTOR } from '../constants/selector';

export default class WinningNumberInputView {
  #container;
  #winningNumberInput;

  constructor(containerSelector) {
    this.#container = $(containerSelector);
    this.#winningNumberInput = $$(this.#container, SELECTOR.CLASS.LOTTO_WINNING_NUMBER);
  }

  init() {
    this.#winningNumberInput.forEach((element) => {
      element.value = '';
    });

    this.hideContainer();
  }

  showContainer() {
    this.#container.classList.add('show');
  }

  hideContainer() {
    this.#container.classList.remove('show');
  }
}
