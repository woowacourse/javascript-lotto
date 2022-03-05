import View from "./View.js";
import { $, $$ } from "../utils/dom.js";
import { validateWinningNumbers } from "../utils/validation.js";

export default class WinningNumberView extends View {
  constructor() {
    super();

    this.winningNumberInput = $$(".winning-number-input");
    $(".winning-number-form").addEventListener("submit", this.#onClickResultButton.bind(this));
  }

  #onClickResultButton(e) {
    e.preventDefault();

    const winningNumberList = Array.from(this.winningNumberInput).map((element) =>
      Number(element.value.trim()),
    );
    try {
      validateWinningNumbers(winningNumberList);
      this.handlers.get("submit").forEach((func) => func(winningNumberList));
    } catch (error) {
      alert(error);
    }
  }

  resetWinningNumbersValue() {
    // eslint-disable-next-line no-param-reassign
    this.winningNumberInput.forEach((element) => (element.value = ""));
  }
}
