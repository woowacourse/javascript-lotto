import View from "./View.js";
import { $, $$ } from "../utils/dom.js";
import { validateWinningNumbers } from "../utils/validation.js";

export default class WinningNumberView extends View {
  constructor() {
    super();
    $(".result-button").addEventListener("click", this.handleResultButtonClick.bind(this));
  }

  handleResultButtonClick() {
    const winningNumberList = Array.from($$(".winning-number-input")).map((element) =>
      Number(element.value.trim()),
    );
    try {
      validateWinningNumbers(winningNumberList);
      this.handlers.get("click").forEach((func) => func(winningNumberList));
    } catch (error) {
      alert(error);
    }
  }
}
