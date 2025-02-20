import {
  getPurchaseAmountInput,
  getBonusNumberInput,
  getWinningNumbersInput,
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
}
export default App;
