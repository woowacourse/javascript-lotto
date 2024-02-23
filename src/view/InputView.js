import readLineAsync from "../utils/readLineAsync.js";
import { VIEW_MESSAGE } from "../constants/viewMessage.js";
import budgetValidation from "../validation/budgetValidation.js";
import winningLottoValidation from "../validation/winningLottoValidation.js";
import winningLottoNumbersValidation from "../validation/winningLottoNumbersValidation.js";
import winningLottoBonusValidation from "../validation/winningLottoBonusValidation.js";
import startValidation from "../validation/startValidation.js";
import retryValidation from "../validation/retryValidation.js";

const InputView = {
  async readBudget() {
    const budgetInput = await readLineAsync(VIEW_MESSAGE.budget);
    startValidation(budgetValidation.categories, Number(budgetInput));

    return budgetInput;
  },

  async readWinningLottoNumbers() {
    const winningLottoNumbersInput = await readLineAsync(VIEW_MESSAGE.winningLottoNumbers);
    const winningLottoNumbers = InputView.convertInputToArray(winningLottoNumbersInput);

    winningLottoNumbers.forEach((number) => startValidation(winningLottoValidation.winningCombination, number));
    startValidation(winningLottoNumbersValidation.winningNumbers, winningLottoNumbers);

    return winningLottoNumbers;
  },

  convertInputToArray(input) {
    return input.split(",").map(Number);
  },

  async readWinningLottoBonus() {
    const winningLottoBonusInput = await readLineAsync(VIEW_MESSAGE.winningLottoBonus);
    const winningLottoBonus = Number(winningLottoBonusInput);
    // const winningCombination = {
    //   normalNumbers: winningNumbers,
    //   bonusNumber: winningLottoBonus,
    // };
    startValidation(winningLottoValidation.winningCombination, winningLottoBonus);
    // startValidation(winningLottoBonusValidation.winningBonus, winningCombination);

    return winningLottoBonus;
  },

  async readRetryGame() {
    const retryInput = await readLineAsync(VIEW_MESSAGE.retry);
    startValidation(retryValidation.categories, retryInput);
    return retryInput;
  },
};

export default InputView;
