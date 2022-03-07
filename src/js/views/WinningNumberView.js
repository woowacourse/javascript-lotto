import { LOTTO_NUMBER, SELECTOR } from "../utils/constants.js";
import { $, setHidden, setShow } from "../utils/dom.js";

export default class WinningNumberView {
  constructor() {
    this.resultButton = $(SELECTOR.RESULT_BUTTON);
    this.winningContainer = $(SELECTOR.WINNING_CONTAINER);
    this.winningContainer.addEventListener("keyup", this.#setAutoCursor.bind(this));
  }

  bindResult(handler) {
    this.resultButton.addEventListener("click", handler);
  }

  showWinningInput() {
    setShow(this.winningContainer);
  }

  hideWinningInput() {
    setHidden(this.winningContainer);
  }

  #setAutoCursor({ target }) {
    const { nextElementSibling: nextWinningNumberInput } = target;

    if (target.value.length >= LOTTO_NUMBER.DIGIT_MAX) {
      target.value = target.value.substr(0, LOTTO_NUMBER.DIGIT_MAX);

      if (nextWinningNumberInput) {
        nextWinningNumberInput.focus();
      }
      if (!nextWinningNumberInput) {
        this.bonusNumberInput.focus();
      }
    }
  }
}
