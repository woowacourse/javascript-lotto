/* eslint-disable no-return-assign */
import View from "./View.js";
import { $, $$ } from "../utils/dom.js";
import { validateWinningNumbers } from "../utils/validation.js";

export default class WinningNumberView extends View {
  constructor() {
    super();
    this.winningNumberInput = $$(".winning-number-input");
    $(".result-button").addEventListener("click", this.onClickResultButton.bind(this));
  }

  onClickResultButton() {
    const winningNumberList = Array.from(this.winningNumberInput).map((element) =>
      Number(element.value.trim()),
    );
    try {
      validateWinningNumbers(winningNumberList);
      this.handlers.get("click").forEach((func) => func(winningNumberList));
    } catch (error) {
      alert(error);
    }
  }

  resetWinningNumbersValue() {
    // eslint-disable-next-line no-param-reassign
    this.winningNumberInput.forEach((element) => (element.value = ""));
  }
}
