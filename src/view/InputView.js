import Console from "../utils/Console.js";
import INPUT_MESSAGE from "../constants/INPUT_MESSAGE.js";
const InputView = {
  async purchaseAmount() {
    return await Console.readLineAsync(INPUT_MESSAGE.PURCHASE_AMOUNT);
  },

  async winningNumbers() {
    return await Console.readLineAsync(INPUT_MESSAGE.WINNING_NUMBERS);
  },

  async bonusNumber() {
    return await Console.readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);
  },

  async restart() {
    return await Console.readLineAsync(INPUT_MESSAGE.RESTART);
  },
};

export default InputView;
