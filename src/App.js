import {
  getPurchaseAmountInput,
  getBonusNumberInput,
  getWinningNumbersInput,
  getRetryInput,
} from './View/inputView.js';
import { readUserInputUntilSuccess, convertFormat } from './View/utils.js';
import {
  validateEmptySpace,
  validatePurchaseAmount,
  validateEmptySpaceInWinningNumbers,
  validateWinningNumbers,
  validateBonusNumber,
} from './View/Validation/inputView.js';
class App {
  async #initialize() {
    const purchaseAmountInput = await readUserInputUntilSuccess({
      readUserInput: getPurchaseAmountInput,
      formatter: (input) => {
        validateEmptySpace(input);
        const convertedInput = convertFormat.toNumber(input);
        validatePurchaseAmount(convertedInput);
        return convertedInput;
      },
    });

    const winningNumbersInput = await readUserInputUntilSuccess({
      readUserInput: getWinningNumbersInput,
      formatter: (input) => {
        validateEmptySpace(input);
        const splittedInput = convertFormat.splitByComma(input);

        validateEmptySpaceInWinningNumbers(splittedInput);
        const numbers = splittedInput.map(Number);
        validateWinningNumbers(numbers);
        return numbers;
      },
    });

    const bonusNumberInput = await readUserInputUntilSuccess({
      readUserInput: getBonusNumberInput,
      formatter: (input) => {
        validateEmptySpace(input);
        const convertedInput = convertFormat.toNumber(input);
        validateBonusNumber(convertedInput, winningNumbersInput);
        return convertedInput;
      },
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
