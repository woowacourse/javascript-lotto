import { COMMAND, INPUT_MESSAGES, SEPERATOR } from "../lib/constants.js";
import { readLineAsync, retryUntilSuccess } from "../lib/utils.js";
import Validator from "../validator/Validator.js";

class InputView {
  static async readPurchaseAmount() {
    return retryUntilSuccess(async () => {
      const rawPurchaseAmount = await readLineAsync(
        INPUT_MESSAGES.purchaseAmount()
      );

      const purchaseAmount = Number(rawPurchaseAmount);
      Validator.validatePurchaseAmount(purchaseAmount);
      return purchaseAmount;
    });
  }

  static async readWinNumbers() {
    return retryUntilSuccess(async () => {
      const rawWinNumber = await readLineAsync(INPUT_MESSAGES.winNumber());
      const winNumbers = rawWinNumber.split(SEPERATOR).map(Number);

      Validator.validateWinNumbers(winNumbers);
      return winNumbers;
    });
  }

  static async readBonusNumber(winNumbers) {
    return retryUntilSuccess(async () => {
      const rawBonusNumber = await readLineAsync(INPUT_MESSAGES.bonusNumber());
      const bonusNumber = Number(rawBonusNumber);

      Validator.validateBonusNumber(bonusNumber, winNumbers);

      return bonusNumber;
    });
  }

  static async readRetry() {
    return retryUntilSuccess(async () => {
      const retryCommand = await readLineAsync(INPUT_MESSAGES.retry());

      Validator.validateRetry(retryCommand);

      return retryCommand === COMMAND.yes;
    });
  }
}

export default InputView;
