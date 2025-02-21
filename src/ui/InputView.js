import readLineAsync from "../util/readLine.js";
import INPUT_MESSAGE from "../constant/input.js";

const InputView = {
  async readPurchaseAmount() {
    const input = await readLineAsync(INPUT_MESSAGE.AMOUNT);

    return input;
  },

  async readWinningNumbers() {
    const input = await readLineAsync(INPUT_MESSAGE.WINNING_NUMBERS);

    return input;
  },

  async readBonusNumber() {
    const input = await readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);

    return input;
  },

  async readRestart() {
    const input = await readLineAsync(INPUT_MESSAGE.RESTART);

    return input;
  },
};

export default InputView;
