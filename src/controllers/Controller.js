import Input from "../views/Input.js";
import validatePurchaseAmount from "../validations/validatePurchaseAmount.js";
import validateWinningNumbers from "../validations/validateWinningNumbers.js";
import throwIfInvalid from "../utils/throwIfInvalid.js";
import validateBonusNumber from "../validations/validateBonusNumber.js";
import issueLottos from "../domains/IssueLottos.js";

class Controller {
  async start() {
    const { purchaseAmount, winningNumbers, bonusNumber } =
      await this.#getValidatedInputs();
    const lottos = issueLottos(purchaseAmount);
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
