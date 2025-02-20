import {
  getPurchaseAmountInput,
} from './View/inputView.js';

class App {
  async #initialize() {
    const purchaseAmountInput = await getPurchaseAmountInput();
    return {
      purchaseAmountInput,
    };
  }

  async run() {
    const { purchaseAmountInput } = this.#initialize();
  }
}
export default App;
