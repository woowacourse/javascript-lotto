import { ConsoleMessage } from '../constants/Constants.js';
import Console from '../utils/Console.js';

const InputView = {
  readPurchaseAmount() {
    return Console.question(ConsoleMessage.PURCHASE_AMOUNT);
  }
};

export default InputView;