import {
  getPurchaseAmountInput,
  getWinningNumbersInput,
} from './View/inputView.js';

class App {
  async #initialize() {
    const purchaseAmountInput = await getPurchaseAmountInput();
    const winningNumbersInput = await getWinningNumbersInput();
    return {
      purchaseAmountInput,
      winningNumbersInput,
    };
  }

  async run() {
    const { purchaseAmountInput, winningNumbersInput } = this.#initialize();
  }
}
export default App;
