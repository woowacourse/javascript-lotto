import { INPUT_MESSAGE } from "../constants/system.js";
import readLineAsync from "../utils/ReadLine.js";

const InputView = {
  inputPurchaseAmount() {
    return readLineAsync(INPUT_MESSAGE.PURCHASE_AMOUNT);
  },

  inputWinningLottoNumber() {
    return readLineAsync(INPUT_MESSAGE.WINNING_LOTTO);
  },

  inputBonusNumber() {
    return readLineAsync(INPUT_MESSAGE.BONUS_NUMBER);
  },

  inputRestartGame() {
    return readLineAsync(INPUT_MESSAGE.RESTART_GAME);
  },
};

export default InputView;
