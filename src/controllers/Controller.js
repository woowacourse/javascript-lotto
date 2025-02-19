import Input from "../views/Input.js";
import validatePurchaseAmount from "../validations/validatePurchaseAmount.js";
import validateWinningNumbers from "../validations/validateWinningNumbers.js";
import throwIfInvalid from "../utils/throwIfInvalid.js";
import validateBonusNumber from "../validations/validateBonusNumber.js";
import issueLottos from "../domains/IssueLottos.js";
import Output from "../views/Output.js";
import WinningStatistics from "../domains/WinningStatistics.js";

class Controller {
  async start() {
    const purchaseAmount = await throwIfInvalid(
      Input.readPurchaseAmount,
      validatePurchaseAmount,
    );

    const lottos = issueLottos(purchaseAmount);
    Output.printIssuedLottos(purchaseAmount, lottos);

    const winningNumbers = await throwIfInvalid(
      Input.readWinningNumbers,
      validateWinningNumbers,
    );

    const bonusNumber = await throwIfInvalid(
      Input.readBonusNumber,
      validateBonusNumber,
      winningNumbers,
    );

    const winningStatistics = new WinningStatistics();
    winningStatistics.calculateWinningResults(
      lottos,
      winningNumbers,
      bonusNumber,
    );
  }
}

export default Controller;
