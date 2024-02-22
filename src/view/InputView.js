import { INPUT_MESSAGES, INPUT_HINTS } from '../constant/Messages.js';
import readLineAsync from '../util/readLine/readLineAsync.js';

const MESSAGES = INPUT_MESSAGES;
const HINTS = INPUT_HINTS;

class InputView {
  static async inputPurchaseAmount() {
    const input = await readLineAsync([MESSAGES.purchaseAmount, HINTS.purchaseAmount].join('\n'));
    return input;
  }

  static async inputWinningNumbers() {
    const input = await readLineAsync(
      [MESSAGES.winningNumbers, HINTS.winningNumber1, HINTS.winningNumber2].join('\n')
    );
    return input;
  }

  static async inputBonusNumber() {
    const input = await readLineAsync([MESSAGES.bonusNumber, HINTS.bonusNumber].join('\n'));
    return input;
  }

  static async inputRestartResponse() {
    const input = await readLineAsync(MESSAGES.restartResponse);
    return input;
  }
}

export default InputView;
