import Input from "../views/Input.js";
import validatePurchaseAmount from "../validations/validatePurchaseAmount.js";
import validateWinningNumbers from "../validations/validateWinningNumbers.js";
import throwIfInvalid from "../utils/throwIfInvalid.js";
import validateBonusNumber from "../validations/validateBonusNumber.js";
import issueLottos from "../domains/issueLottos.js";
import Output from "../views/Output.js";
import WinningStatistics from "../domains/WinningStatistics.js";
import validateRestartConfirm from "../validations/validateRestartConfirm.js";
import { YES } from "../constants/constants.js";

class Controller {
  async start() {
    await this.#runLottoGame();
    const restartConfirm = await throwIfInvalid(
      Input.readRestartConfirm,
      validateRestartConfirm,
    );
    if (restartConfirm === YES) await this.start();
  }

  async #runLottoGame() {
    const purchaseAmount = await this.#getPurchaseAmount();
    const lottos = issueLottos(purchaseAmount);
    Output.printIssuedLottos(purchaseAmount, lottos);

    const { winningNumbers, bonusNumber } =
      await this.#getWinningAndBonusNumbers();

    const winningStatistics = new WinningStatistics(lottos);
    winningStatistics.calculateWinningResults(winningNumbers, bonusNumber);

    Output.printStatistics(winningStatistics.statistics);
    Output.printProfitRatio(
      winningStatistics.calculateProfitRatio(purchaseAmount),
    );
  }

  async #getPurchaseAmount() {
    return await throwIfInvalid(
      Input.readPurchaseAmount,
      validatePurchaseAmount,
    );
  }

  async #getWinningAndBonusNumbers() {
    const winningNumbers = await throwIfInvalid(
      Input.readWinningNumbers,
      validateWinningNumbers,
    );
    const bonusNumber = await throwIfInvalid(
      Input.readBonusNumber,
      validateBonusNumber,
      winningNumbers,
    );
    return { winningNumbers, bonusNumber };
  }
}

export default Controller;
