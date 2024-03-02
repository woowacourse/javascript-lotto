import { ELEMENT_SELECTOR } from "../../constants/lotto";

export default class WinningLottoForm {
  static #winningLottoForm = document.getElementById(
    ELEMENT_SELECTOR.winningLottoForm,
  );

  static #winningLottoContainer = document.getElementById(
    ELEMENT_SELECTOR.winningLottoContainer,
  );

  static #bonusNumberContainer = document.getElementById(
    ELEMENT_SELECTOR.bonusNumberContainer,
  );

  static #isEmptyHTML(element) {
    return element.innerHTML === "";
  }

  static #renderBonusNumberInput() {
    if (!WinningLottoForm.#isEmptyHTML(WinningLottoForm.#bonusNumberContainer))
      return;

    WinningLottoForm.#bonusNumberContainer.innerHTML = `<input type="number"
      class = "text-h-center winning-input" 
      id = "bonus-number-input"
      required 
      min = "1" 
      max = "45" />`;
  }

  static #renderWinningLottoInputs() {
    if (!WinningLottoForm.#isEmptyHTML(WinningLottoForm.#winningLottoContainer))
      return;

    WinningLottoForm.#winningLottoContainer.innerHTML = `<input type="number"
      class = "text-h-center winning-input winning-lotto-input" 
      id = "winning-number-input"
      required 
      min = "1" 
      max = "45" />`.repeat(6);
  }

  static focusFirstWinningLottoInput() {
    WinningLottoForm.#winningLottoContainer.children[0].focus();
  }

  static resetWinningLottoForm() {
    WinningLottoForm.#winningLottoForm.reset();
  }

  static renderWinningLottoForm() {
    WinningLottoForm.#winningLottoForm.classList.remove("hidden");
    WinningLottoForm.#renderWinningLottoInputs();
    WinningLottoForm.#renderBonusNumberInput();
    WinningLottoForm.focusFirstWinningLottoInput();
  }

  static hideWinningLottoForm() {
    WinningLottoForm.#winningLottoForm.classList.add("hidden");
  }
}
