import ConsoleInputHandler from '../utils/ConsoleInputHandler';
import { INPUT_INFO } from '../../constant/messages';

const InputView = {
  async readPurchaseAmount() {
    return await ConsoleInputHandler.readLineAsync(INPUT_INFO.PURCHASE);
  },

  async readWinningNumbers() {
    return await ConsoleInputHandler.readLineAsync(INPUT_INFO.WINNING_NUMBER);
  },

  async readBonusNumber() {
    return await ConsoleInputHandler.readLineAsync(INPUT_INFO.BONUS_NUMBER);
  },

  async readRestartOrExit() {
    return await ConsoleInputHandler.readLineAsync(INPUT_INFO.RESTART_OR_EXIT);
  },
};

export default InputView;
