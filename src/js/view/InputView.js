import { INPUT_MESSAGES } from '../constant/Messages.js';
import readLineAsync from '../util/readLineAsync.js';

const MESSAGES = INPUT_MESSAGES;

class InputView {
  static async inputPurchaseAmount() {
    const input = await readLineAsync(MESSAGES.purchaseAmount);
    return input;
  }

  static async inputWinningNumbers() {
    const input = await readLineAsync(MESSAGES.winningNumbers);
    return input;
  }

  static async inputBonusNumber() {
    const input = await readLineAsync(MESSAGES.bonusNumber);
    return input;
  }

  static async inputRestartResponse() {
    const input = await readLineAsync(MESSAGES.restartResponse);
    return input;
  }
}

export default InputView;
