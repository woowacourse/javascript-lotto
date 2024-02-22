import readLineAsync from "../utils/readLineAsync.js";
import { VIEW_MESSAGE } from "../constants/viewMessage.js";
import BudgetValidation from "../validation/budgetValidation.js";
import winningLottoNumbersValidation from "../validation/winningLottoNumbersValidation.js";
import startValidation from "../validation/startValidation.js";

const InputView = {
  async readBudget() {
    const budgetInput = await readLineAsync(VIEW_MESSAGE.budget);
    startValidation(Number(budgetInput)); // TODO : 수정하기

    return budgetInput;
  },

  async readWinningLottoNumbers() {
    const winningLottoNumbersInput = await readLineAsync(VIEW_MESSAGE.winningLottoNumbers);
    const winningLottoNumbers = InputView.convertInputToArray(winningLottoNumbersInput);

    startValidation(winningLottoNumbersValidation.winningNumbers, winningLottoNumbers);

    return winningLottoNumbers;
  },

  convertInputToArray(input) {
    return input.split(",").map(Number);
  },
};

export default InputView;
