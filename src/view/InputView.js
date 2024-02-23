import { INPUT_MESSAGE } from "../constants/viewMessage.js";

import readLineAsync from "../utils/readLineAsync.js";
import startValidation from "../validation/startValidation.js";
import retryValidation from "../validation/retryValidation.js";
import budgetValidation from "../validation/budgetValidation.js";
import winningLottoValidation from "../validation/winningLottoValidation.js";
import winningLottoBonusValidation from "../validation/winningLottoBonusValidation.js";
import winningLottoNumbersValidation from "../validation/winningLottoNumbersValidation.js";

const InputView = {
  async readBudget() {
    const budgetInput = await readLineAsync(INPUT_MESSAGE.budget);
    startValidation(budgetValidation.categories, Number(budgetInput));

    return budgetInput;
  },

  async readWinningLottoNumbers() {
    const winningLottoNumbersInput = await readLineAsync(INPUT_MESSAGE.winningLottoNumbers);
    const winningLottoNumbers = InputView.convertInputToArray(winningLottoNumbersInput);

    winningLottoNumbers.forEach((number) => {
      startValidation(winningLottoValidation.winningCombination, number);
    });
    startValidation(winningLottoNumbersValidation.winningNumbers, winningLottoNumbers);

    return winningLottoNumbers;
  },

  convertInputToArray(input) {
    return input.split(",").map(Number);
  },

  async readWinningLottoBonus(winningNumbers) {
    const winningLottoBonusInput = await readLineAsync(INPUT_MESSAGE.winningLottoBonus);
    const winningLottoBonus = Number(winningLottoBonusInput);
    const winningCombination = {
      normalNumbers: winningNumbers,
      bonusNumber: winningLottoBonus,
    };
    startValidation(winningLottoValidation.winningCombination, winningLottoBonus);
    startValidation(winningLottoBonusValidation.winningBonus, winningCombination);

    return winningLottoBonus;
  },

  async readRetryGame() {
    const retryInput = await readLineAsync(INPUT_MESSAGE.retry);
    startValidation(retryValidation.categories, retryInput);
    return retryInput;
  },
};

export default InputView;
