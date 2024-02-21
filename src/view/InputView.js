import { INPUT_MESSAGE } from "../constants/system.js";
import readLineAsync from "../utils/ReadLine.js";

const InputView = {
  async inputPurchaseAmount() {
    const input = await readLineAsync(INPUT_MESSAGE.PURCHASE_AMOUNT);
    return input;
  },

  async inputWinningLottoNumber() {
    const input = await readLineAsync(INPUT_MESSAGE.WINNING_LOTTO);
    return input;
  },

  async inputBonusNumber() {
    const input = await readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);
    return input;
  },

  async inputRestartGame() {
    const input = await readLineAsync(INPUT_MESSAGE.RESTART_GAME);
    return input;
  },
};

export default InputView;
