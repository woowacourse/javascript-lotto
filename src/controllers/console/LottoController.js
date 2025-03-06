import InputController from "./InputController.js";
import issueLottos from "../../domains/common/issueLottos.js";
import OutputView from "../../views/console/OutputView.js";
import WinningStatistics from "../../domains/common/WinningStatistics.js";
import { YES } from "../../constants/constants.js";

class LottoController {
  async start() {
    await this.#runLottoGame();
    const restartConfirm = await InputController.getValidRestartConfirm();
    if (restartConfirm === YES) await this.start();
  }

  async #runLottoGame() {
    const purchaseAmount = await InputController.getValidPurchaseAmount();
    const lottos = issueLottos(purchaseAmount);
    OutputView.printIssuedLottos(lottos);

    const winningNumbers = await InputController.getValidWinningNumbers();
    const bonusNumber =
      await InputController.getValidBonusNumber(winningNumbers);

    const winningStatistics = new WinningStatistics(lottos);
    winningStatistics.calculateWinningResults(winningNumbers, bonusNumber);

    OutputView.printStatistics(winningStatistics.statistics);
    OutputView.printProfitRatio(
      winningStatistics.calculateProfitRatio(purchaseAmount),
    );
  }
}

export default LottoController;
