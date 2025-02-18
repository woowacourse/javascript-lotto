import Input from "./view/Input.js";
import validatePurchaseAmount from "./domain/validation/validatePurchaseAmount.js";
import validateWinningNumbers from "./domain/validation/validateWinningNumbers.js";
import throwIfInvalid from "./utils/throwIfInvalid.js";
import Output from "./view/Output.js";
import validateBonusNumber from "./domain/validation/validateBonusNumber.js";

class App {
  async start() {
    const { purchaseAmount, winningNumbers, bonusNumber } =
      await this.#getValidatedInputs();
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
    const bonusNumber = await this.#getValidatedBonusNumber(winningNumbers);

    return { purchaseAmount, winningNumbers, bonusNumber };
  }

  async #getValidatedBonusNumber(winningNumbers) {
    while (true) {
      try {
        const input = await Input.readBonusNumber();
        return validateBonusNumber(input, winningNumbers);
      } catch (error) {
        Output.printErrorMessage(error.message);
      }
    }
  }
}
export default App;
