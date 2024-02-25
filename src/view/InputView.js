import Console from '../utils/Console';
import { MESSAGE } from '../constants/message';

class InputView {
  static async readPurchaseAmount() {
    return await Console.readLineAsync(MESSAGE.PURCHASE_AMOUNT);
  }

  static async readWinningNumber() {
    return await Console.readLineAsync(MESSAGE.ENTER_WINNING_NUMBERS);
  }

  static async readBonusNumber() {
    return await Console.readLineAsync(MESSAGE.ENTER_BONUS_NUMBER);
  }
  static async readRestartOrExit() {
    return await Console.readLineAsync(MESSAGE.RESTART);
  }
}

export default InputView;
