import { INPUT_INFO } from '../constant/messages';
import Console from '../utils/Console';

const InputView = {
  async readPurchaseAmount() {
    return await Console.readLineAsync(INPUT_INFO.PURCHASE);
  },

  async readWinningNumbers() {
    return await Console.readLineAsync(INPUT_INFO.WINNING_NUMBER);
  },

  async readBonusNumber() {
    return await Console.readLineAsync(INPUT_INFO.BONUS_NUMBER);
  },

  async readRestartOrExit() {
    return await Console.readLineAsync(INPUT_INFO.RESTART_OR_EXIT);
  },
};

export default InputView;
