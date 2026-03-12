import { LOTTO } from "../constants";
import Validator from "../Validator";

const WebView = {
  readMoney() {
    const purchaseInput = document.querySelector(".purchase-form__input").value;
    Validator.notEmptyString(purchaseInput);
    Validator.stringIsNumber(purchaseInput);

    const money = Number(purchaseInput);
    return money;
  },

  readWinningNumbers() {
    const winningNumberInputNodes = document.querySelectorAll(
      ".winning-form__input:not(.winning-form__input--bonus)",
    );

    const winningNumberString = Array.from(
      winningNumberInputNodes,
      (node) => node.value,
    );

    const winningNumbers = winningNumberString.map((string) => {
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
  },

  readBonusNumber() {
    const bonusNumberInput = document.querySelector(
      ".winning-form__input--bonus",
    ).value;
    Validator.notEmptyString(bonusNumberInput);
    Validator.stringIsNumber(bonusNumberInput);

    const bonusNumber = Number(bonusNumberInput);

    Validator.positiveNumber(bonusNumber);
    Validator.numberLower(LOTTO.LOWER, bonusNumber);
    Validator.numberUpper(LOTTO.UPPER, bonusNumber);
    return bonusNumber;
  },
};

export default WebView;
