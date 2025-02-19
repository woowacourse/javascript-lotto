import { INPUT_MESSAGES, SEPERATOR } from "../lib/constants.js";
import { readLineAsync } from "../lib/utils.js";

class InputView {
  static async readPurchaseAmount() {
    try {
      const rawPurchaseAmount = await readLineAsync(
        INPUT_MESSAGES.purchaseAmount()
      );

      const purchaseAmount = Number(rawPurchaseAmount);

      return purchaseAmount;
    } catch (error) {
      console.log(error.message);
      return await this.readPurchaseAmount();
    }
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

  static async readRetry() {
    const retryCommand = await readLineAsync(INPUT_MESSAGES.retry());

    return retryCommand === "y";
  }
}

export default InputView;
