import Validator from "../Validator";

class WinningLottoView {
  #form;
  #winningNumberInputs;
  #bonusNumberInput;

  #allNumbersInput;

  constructor() {
    this.#form = document.querySelector(".winning-form");
    this.#winningNumberInputs = document.querySelectorAll(
      ".winning-form__input:not(.winning-form__input--bonus)",
    );
    this.#bonusNumberInput = document.querySelector(
      ".winning-form__input--bonus",
    );

    this.#allNumbersInput = [
      ...this.#winningNumberInputs,
      this.#bonusNumberInput,
    ];
  }

  init() {
    this.#form.reset();
    this.hide();
    this.#allNumbersInput.forEach((node) => {
      node.disabled = false;
      node.style.cursor = "";
    });
  }

  disableInputs() {
    this.#allNumbersInput.forEach((node) => {
      node.disabled = true;
      node.style.cursor = "not-allowed";
    });
  }

  readWinningNumbers() {
    const rawWinningNumbers = Array.from(
      this.#winningNumberInputs,
      (node) => node.value,
    );

    const winningNumbers = rawWinningNumbers.map((string) => {
      Validator.notEmptyString(string);
      Validator.stringIsNumber(string);
      return Number(string);
    });

    return winningNumbers;
  }

  readBonusNumber() {
    const rawBonusNumber = this.#bonusNumberInput.value;
    Validator.notEmptyString(rawBonusNumber);
    Validator.stringIsNumber(rawBonusNumber);

    const bonusNumber = Number(rawBonusNumber);

    return bonusNumber;
  }

  bindSubmitButton(successSubmit) {
    this.#form.addEventListener("submit", (e) => {
      e.preventDefault();
      successSubmit();
    });
  }

  show() {
    this.#form.style.visibility = "visible";
  }

  hide() {
    this.#form.style.visibility = "hidden";
  }
}

export default WinningLottoView;
