import { LOTTO } from "../constants";
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

    winningNumbers.forEach((number) => {
      Validator.positiveNumber(number);
      Validator.numberLower(LOTTO.LOWER, number);
      Validator.numberUpper(LOTTO.UPPER, number);
    });
    Validator.notDuplicated(winningNumbers);

    Validator.arrayLength(winningNumbers, LOTTO.COUNT);

    return winningNumbers;
  }

  readBonusNumber() {
    const rawBonusNumber = this.#bonusNumberInput.value;
    Validator.notEmptyString(rawBonusNumber);
    Validator.stringIsNumber(rawBonusNumber);

    const bonusNumber = Number(rawBonusNumber);

    // 도메인 검증 분리하기
    Validator.positiveNumber(bonusNumber);
    Validator.numberLower(LOTTO.LOWER, bonusNumber);
    Validator.numberUpper(LOTTO.UPPER, bonusNumber);
    return bonusNumber;
  }

  bindSubmitButton(successSubmit) {
    this.#form.addEventListener("submit", (e) => {
      try {
        const winningNumbers = this.readWinningNumbers();
        const bonusNumber = this.readBonusNumber();

        successSubmit(winningNumbers, bonusNumber);

        this.#allNumbersInput.forEach((node) => {
          node.disabled = true;
          node.style.cursor = "not-allowed";
        });
      } catch (error) {
        alert(error.message);
      }
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
