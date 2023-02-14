import { ConsoleMessage } from '../constants/Constants';
import Console from '../utils/Console';

const InputView = {
  readPurchaseAmount() {
    return Console.question(ConsoleMessage.PURCHASE_AMOUNT);
  }
};

export default InputView;