import { $, $$ } from "../utils/dom.js";
import { validateWinningNumber } from "../utils/validation.js";

export default class WinningNumberView {
  constructor() {
    this.winningNumbers = $$(".winning-number-input");

    $(".result-button").addEventListener("click", this.handleResultButtonClick.bind(this));
  }

  handleResultButtonClick() {
    try {
      this.winningNumbers.forEach((element) => {
        const inputNumber = element.value.trim();
        validateWinningNumber(inputNumber);
      });
    } catch (error) {
      alert(error);
    }
  }
}
