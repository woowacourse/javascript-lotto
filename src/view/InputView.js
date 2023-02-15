import Console from '../utils/Console.js';
import { REQUEST_MESSAGE } from '../constants/message.js';

const InputView = {
  readPurchaseAmount() {
    return Console.question(REQUEST_MESSAGE.readPurchaseAmount);
  },

  readWinningNumbers() {
    return Console.question(REQUEST_MESSAGE.winningNumbers);
  },

  readBonusNumber() {
    return Console.question(REQUEST_MESSAGE.bonusNumber);
  },

  readRestartCommand() {
    return Console.question(REQUEST_MESSAGE.restartCommand);
  },
};

export default InputView;
