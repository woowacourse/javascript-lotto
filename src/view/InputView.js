import PROGRESS_MESSAGES from '../constants/messages/progressMessages';
import Console from '../util/Console';

class InputView {
  static async readMoney() {
    const input = await Console.readLineAsync(PROGRESS_MESSAGES.READ_MONEY_MESSAGE);

    return input;
  }

  static async readWinnigNumbers() {
    const input = await Console.readLineAsync(PROGRESS_MESSAGES.READ_WINNIG_NUMBERS_MESSAGE);

    return input;
  }

  static async readBonusNumber() {
    const input = await Console.readLineAsync(PROGRESS_MESSAGES.READ_BONUS_NUMBER_MESSAGE);

    return input;
  }

  static async readRetryResponse() {
    const input = await Console.readLineAsync(PROGRESS_MESSAGES.READ_RETRY_MESSAGE);

    return input;
  }
}

export default InputView;
