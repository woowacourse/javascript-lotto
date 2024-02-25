import readLineAsync from "../utils/readLineAsync.js";
import { VIEW_MESSAGE } from "../constants/viewMessage.js";
import budgetValidation from "../validation/budgetValidation.js";
import winningLottoValidation from "../validation/winningLottoValidation.js";
import winningLottoNumbersValidation from "../validation/winningLottoNumbersValidation.js";
import winningLottoBonusValidation from "../validation/winningLottoBonusValidation.js";
import startValidation from "../validation/startValidation.js";
import retryValidation from "../validation/retryValidation.js";
import commonInputValidation from "../validation/commonInputValidation.js";

const InputView = {
  async read(message) {
    const input = await readLineAsync(message);
    startValidation(commonInputValidation.categories, input);
    return input;
  },

  async readBudget() {
    const budgetInput = await this.read(VIEW_MESSAGE.budget);
    const budget = Number(budgetInput);
    startValidation(budgetValidation.categories, budget);

    return budget;
  },

  async readWinningLottoNumbers() {
    const winningLottoNumbersInput = await this.read(VIEW_MESSAGE.winningLottoNumbers);
    const winningLottoNumbers = InputView.convertInputToArray(winningLottoNumbersInput);

    startValidation(winningLottoNumbersValidation.winningNumbers, winningLottoNumbers);
    winningLottoNumbers.forEach((number) => startValidation(winningLottoValidation.commonCategories, number));

    return winningLottoNumbers;
  },

  convertInputToArray(input) {
    return input.split(",").map(Number);
  },

  async readWinningLottoBonus(winningNumbers) {
    const winningLottoBonusInput = await this.read(VIEW_MESSAGE.winningLottoBonus);
    const winningLottoBonus = Number(winningLottoBonusInput);
    const winningCombination = {
      normalNumbers: winningNumbers,
      bonusNumber: winningLottoBonus,
    };

    startValidation(winningLottoValidation.commonCategories, winningLottoBonus);
    startValidation(winningLottoBonusValidation.winningBonus, winningCombination);

    return winningCombination;
  },

  async readRetryGame() {
    const retryInput = await this.read(VIEW_MESSAGE.retry);
    startValidation(retryValidation.categories, retryInput);
    return retryInput;
  },
};

export default InputView;
