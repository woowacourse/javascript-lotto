import readLineAsync from "../util/readLine.js";
import INPUT_MESSAGE from "../constant/input.js";

const InputView = {
  async readPurchaseAmount() {
    return await readLineAsync(INPUT_MESSAGE.AMOUNT);
  },

  async readWinningNumbers() {
    return await readLineAsync(INPUT_MESSAGE.WINNING_NUMBERS);
  },

  async readBonusNumber() {
    return await readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);
  },

  async readRestart() {
    return await readLineAsync(INPUT_MESSAGE.RESTART);
  },
};

export default InputView;
