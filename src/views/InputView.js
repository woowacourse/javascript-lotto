import { INPUT_MESSAGES } from "../lib/constants.js";
import { readLineAsync } from "../lib/utils.js";

class InputView {
  static async readPurchaseAmount() {
    const purchaseAmount = await readLineAsync(INPUT_MESSAGES.purchaseAmount());

    return purchaseAmount;
  }
}

export default InputView;
