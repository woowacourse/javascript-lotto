import Console from '../util/Console';
import { INPUT_MESSAGE } from '../constant/message';

const InputView = {
  readPurchaseAmount() {
    return Console.readLine(INPUT_MESSAGE.PURCHASE_AMOUNT);
  },

  readWinningNumber() {
    return Console.readLine(INPUT_MESSAGE.WINNING_NUMBER);
  },

  readBonusNumber() {
    return Console.readLine(INPUT_MESSAGE.BONUS_NUMBER);
  },

  readRestartCommand() {
    return Console.readLine(INPUT_MESSAGE.RESTART_COMMAND);
  },
};

export default InputView;
