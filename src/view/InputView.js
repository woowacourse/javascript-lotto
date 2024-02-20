import PROGRESS_MESSAGES from '../constants/messages/progressMessages';
import Console from '../util/Console';

class InputView {
  static async readMoney() {
    const input = await Console.readLineAsync(PROGRESS_MESSAGES.READ_MONEY_MESSAGE);

    return input;
  }
}

export default InputView;
