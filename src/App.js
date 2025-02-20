import {
  getPurchaseAmountInput,
  getBonusNumberInput,
  getWinningNumbersInput,
  getRetryInput,
} from './View/inputView.js';
import { readUserInputUntilSuccess, convertFormat } from './View/utils.js';
import { validatePurchaseAmount } from './View/Validation/inputView.js';
class App {
  async #initialize() {
    const purchaseAmountInput = await readUserInputUntilSuccess({
      readUserInput: getPurchaseAmountInput,
      validation: validatePurchaseAmount,
      formatter: convertFormat.toNumber,
    });

    const winningNumbersInput = await readUserInputUntilSuccess({
      readUserInput: getWinningNumbersInput,
      validation: (input) => input,
      formatter: convertFormat.splitByComma,
    });

    const bonusNumberInput = await readUserInputUntilSuccess({
      readUserInput: getBonusNumberInput,
      validation: (input) => input,
      formatter: convertFormat.toNumber,
    });

    return {
      purchaseAmountInput,
      winningNumbersInput,
      bonusNumberInput,
    };
  }

  async run() {
    const { purchaseAmountInput, winningNumbersInput, bonusNumberInput } =
      await this.#initialize();
  }

  async retryRun() {
    const retry = await getRetryInput();
  }
}
export default App;
