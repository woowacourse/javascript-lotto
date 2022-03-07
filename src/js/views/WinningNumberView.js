import View from "./View.js";
import { $, $$ } from "../utils/dom.js";
import { validateWinningNumbers } from "../utils/validation.js";
import { BONUS_NUMBER_ID } from "../utils/constants.js";

export default class WinningNumberView extends View {
  constructor() {
    super();

    this.winningNumberInput = $$(".winning-number-input");
    this.winningNumberForm = $(".winning-number-form");
    this.winningNumberForm.addEventListener("submit", this.#onClickResultButton);
    this.winningNumberForm.addEventListener("keyup", this.focusInput);
  }

  #onClickResultButton = (e) => {
    e.preventDefault();

    const winningNumberList = Array.from(this.winningNumberInput).map((input) =>
      input.value.trim() === "" ? null : Number(input.value),
    );
    try {
      validateWinningNumbers(winningNumberList);
      this.handlers.get("submit").forEach((func) => func(winningNumberList));
    } catch (error) {
      this.resetWinningNumbersValue();
      alert(error);
    }
  };

  focusInput = ({ target }) => {
    if (target.tagName !== "INPUT") return;
    if (target.value.length < 2) return;
    if (target.id === BONUS_NUMBER_ID) {
      $(".result-button").focus();
      return;
    }
    if (!target.nextSibling.nextElementSibling) {
      $("#bonus-number-input").focus();
      return;
    }
    target.nextSibling.nextElementSibling.focus();
  };

  resetWinningNumbersValue() {
    // eslint-disable-next-line no-param-reassign
    this.winningNumberInput.forEach((element) => (element.value = ""));
  }
}
