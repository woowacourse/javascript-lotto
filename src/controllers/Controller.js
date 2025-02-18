import Input from "../views/Input.js";
import validatePurchaseAmount from "../validations/validatePurchaseAmount.js";
import validateWinningNumbers from "../validations/validateWinningNumbers.js";
import throwIfInvalid from "../utils/throwIfInvalid.js";
import Output from "../views/Output.js";
import validateBonusNumber from "../validations/validateBonusNumber.js";

class Controller {
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
    const bonusNumber = await throwIfInvalid(
      Input.readBonusNumber,
      validateBonusNumber,
      winningNumbers,
    );

    return { purchaseAmount, winningNumbers, bonusNumber };
  }
}

export default Controller;
