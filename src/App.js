import Input from "./view/Input.js";
import validatePurchaseAmount from "./domain/validation/validatePurchaseAmount.js";
import validateWinningNumbers from "./domain/validation/validateWinningNumbers.js";
import throwIfInvalid from "./utils/throwIfInvalid.js";

class App {
  async start() {
    const { purchaseAmount, winningNumbers } = await this.#getValidatedInputs();
  }

  async #getValidatedInputs() {
    const purchaseAmount = await throwIfInvalid(
      Input.readPurchaseAmount,
      validatePurchaseAmount,
    );
    const winningNumbers = await throwIfInvalid(
      Input.readWinningNumbers,
      validateWinningNumbers,
    );
    // const bonusNumber = await throwIfInvalid(Input.readBonusNumber, validateBonusNumber);

    return { purchaseAmount, winningNumbers };
  }
}
export default App;
