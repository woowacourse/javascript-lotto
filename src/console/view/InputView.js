import ConsoleIO from '../utils/ConsoleIO';
import { INPUT_MESSAGE } from '../constants/message';

const InputView = {
  readPurchaseAmount() {
    return ConsoleIO.readLine(INPUT_MESSAGE.PURCHASE_AMOUNT);
  },

  readWinningNumber() {
    return ConsoleIO.readLine(INPUT_MESSAGE.WINNING_NUMBER);
  },

  readBonusNumber() {
    return ConsoleIO.readLine(INPUT_MESSAGE.BONUS_NUMBER);
  },

  readRestartCommand() {
    return ConsoleIO.readLine(INPUT_MESSAGE.RESTART_COMMAND);
  },
};

export default InputView;
