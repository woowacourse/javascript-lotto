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
<<<<<<< HEAD
    const budgetInput = await readLineAsync(INPUT_MESSAGE.BUDGET);
    startValidation(budgetValidation.categories, Number(budgetInput));
=======
    const budgetInput = await readLineAsync(VIEW_MESSAGE.budget);
    startValidation(Number(budgetInput)); // TODO : 수정하기
>>>>>>> 47d5025 (feat: 로또 당첨 번호 입력 기능 구현)

    return budgetInput;
  },

  async readWinningLottoNumbers() {
<<<<<<< HEAD
    const winningLottoNumbersInput = await readLineAsync(INPUT_MESSAGE.WINNING_LOTTO_NUMBERS);
    const winningLottoNumbers = InputView.convertInputToArray(winningLottoNumbersInput);

    winningLottoNumbers.forEach((number) => {
      startValidation(winningLottoValidation.winningCombination, number);
    });
=======
    const winningLottoNumbersInput = await readLineAsync(VIEW_MESSAGE.winningLottoNumbers);
    const winningLottoNumbers = InputView.convertInputToArray(winningLottoNumbersInput);

>>>>>>> 47d5025 (feat: 로또 당첨 번호 입력 기능 구현)
    startValidation(winningLottoNumbersValidation.winningNumbers, winningLottoNumbers);

    return winningLottoNumbers;
  },

  convertInputToArray(input) {
    return input.split(",").map(Number);
  },
<<<<<<< HEAD

  async readWinningLottoBonus(winningNumbers) {
    const winningLottoBonusInput = await readLineAsync(INPUT_MESSAGE.WINNING_BONUS_NUMBER);
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
    const retryInput = await readLineAsync(INPUT_MESSAGE.RETRY);
    startValidation(retryValidation.categories, retryInput);
    return retryInput;
  },
=======
>>>>>>> 47d5025 (feat: 로또 당첨 번호 입력 기능 구현)
};

export default InputView;
