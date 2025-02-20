import {
  getPurchaseAmountInput,
  getBonusNumberInput,
  getWinningNumbersInput,
  getRetryInput,
} from './View/inputView.js';

class App {
  async #initialize() {
    const purchaseAmountInput = await getPurchaseAmountInput();
    const winningNumbersInput = await getWinningNumbersInput();
    const bonusNumberInput = await getBonusNumberInput();
    return {
      purchaseAmountInput,
      winningNumbersInput,
      bonusNumberInput,
    };
  }

  async run() {
    const { purchaseAmountInput, winningNumbersInput, bonusNumberInput } =
      this.#initialize();
  }

  async retryRun() {
    const retry = await getRetryInput();
  }
}
export default App;
