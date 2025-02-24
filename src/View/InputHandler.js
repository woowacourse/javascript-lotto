import { readUserInputUntilSuccess } from './Utils/utils.js';
import {
  getPurchaseAmountInput,
  getBonusNumberInput,
  getWinningNumbersInput,
  getRetryInput,
} from './inputView.js';
import Validator from './Validation/Validator.js';

class InputHandler {
  static async getPurchaseAmount() {
    return await readUserInputUntilSuccess({
      readUserInput: getPurchaseAmountInput,
      formatter: Validator.validatePurchaseAmount,
    });
  }
  static async getWinningNumbers() {
    return await readUserInputUntilSuccess({
      readUserInput: getWinningNumbersInput,
      formatter: Validator.validateWinningNumbers,
    });
  }
  static async getBonusNumber(winningNumbers) {
    return await readUserInputUntilSuccess({
      readUserInput: getBonusNumberInput,
      formatter: (input) =>
        Validator.validateBonusNumber(input, winningNumbers),
    });
  }

  static async getRetry() {
    return await readUserInputUntilSuccess({
      readUserInput: getRetryInput,
      formatter: Validator.validateRetryInput,
    });
  }
}

export default InputHandler;
