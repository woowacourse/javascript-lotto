import { readUserInputUntilSuccess } from './Utils/utils.js';
import {
  getPurchaseAmountInput,
  getBonusNumberInput,
  getWinningNumbersInput,
  getRetryInput,
} from './inputView.js';
import {
  validatePurchaseAmountInput,
  validateWinningNumbersInput,
  validateBonusNumberInput,
  validateRetryInput,
} from '../Validation/validateUI.js';

class InputHandler {
  static async getPurchaseAmount() {
    return await readUserInputUntilSuccess({
      readUserInput: getPurchaseAmountInput,
      formatter: validatePurchaseAmountInput,
    });
  }
  static async getWinningNumbers() {
    return await readUserInputUntilSuccess({
      readUserInput: getWinningNumbersInput,
      formatter: validateWinningNumbersInput,
    });
  }
  static async getBonusNumber(winningNumbers) {
    return await readUserInputUntilSuccess({
      readUserInput: getBonusNumberInput,
      formatter: (input) => validateBonusNumberInput(input, winningNumbers),
    });
  }

  static async getRetry() {
    return await readUserInputUntilSuccess({
      readUserInput: getRetryInput,
      formatter: validateRetryInput,
    });
  }
}

export default InputHandler;
