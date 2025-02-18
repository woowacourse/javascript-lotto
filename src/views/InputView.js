import { INPUT_MESSAGES, SEPERATOR } from "../lib/constants.js";
import { readLineAsync } from "../lib/utils.js";

class InputView {
  static async readPurchaseAmount() {
    const purchaseAmount = await readLineAsync(INPUT_MESSAGES.purchaseAmount());

    return Number(purchaseAmount);
  }

  static async readWinNumbers() {
    const winNumber = await readLineAsync(INPUT_MESSAGES.winNumber());

    return winNumber.split(SEPERATOR).map(Number);
  }

  static async readBonusNumber() {
    const bonusNumber = await readLineAsync(INPUT_MESSAGES.bonusNumber());

    return Number(bonusNumber);
  }
}

export default InputView;
