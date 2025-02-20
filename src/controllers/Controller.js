import Input from "../views/Input.js";
import validatePurchaseAmount from "../validations/validatePurchaseAmount.js";
import validateWinningNumbers from "../validations/validateWinningNumbers.js";
import throwIfInvalid from "../utils/throwIfInvalid.js";
import validateBonusNumber from "../validations/validateBonusNumber.js";
import issueLottos from "../domains/IssueLottos.js";
import Output from "../views/Output.js";
import WinningStatistics from "../domains/WinningStatistics.js";
import validateRestartConfirm from "../validations/validateRestartConfirm.js";

class Controller {
  async start() {
    await this.#issue();
    const restartConfirm = await throwIfInvalid(
      Input.readRestartConfirm,
      validateRestartConfirm,
    );
    if (restartConfirm === "y") await this.start();
  }

  async #issue() {
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

    Output.printStatistics(winningStatistics.statistics);
    Output.printProfitRatio(
      winningStatistics.calculateProfitRatio(purchaseAmount),
    );
  }
}

export default Controller;
