import { INPUT_MESSAGES, SEPERATOR } from "../lib/constants.js";
import { readLineAsync } from "../lib/utils.js";

class InputView {
  static async readPurchaseAmount() {
    const rawPurchaseAmount = await readLineAsync(
      INPUT_MESSAGES.purchaseAmount()
    );

    const purchaseAmount = Number(rawPurchaseAmount);

    // Validator.validatePurchaseAmount(purchaseAmount);
    return purchaseAmount;
  }

  static async readWinNumbers() {
    const rawWinNumber = await readLineAsync(INPUT_MESSAGES.winNumber());
    const winNumber = rawWinNumber.split(SEPERATOR).map(Number);

    return winNumber;
  }

  static async readBonusNumber() {
    const rawBonusNumber = await readLineAsync(INPUT_MESSAGES.bonusNumber());
    const bonusNumber = Number(rawBonusNumber);

    return bonusNumber;
  }
}

export default InputView;
