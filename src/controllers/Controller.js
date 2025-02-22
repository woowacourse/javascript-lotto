import InputService from "../services/InputService.js";
import issueLottos from "../domains/issueLottos.js";
import OutputView from "../views/OutputView.js";
import WinningStatistics from "../domains/WinningStatistics.js";
import { YES } from "../constants/constants.js";

class Controller {
  async start() {
    await this.#runLottoGame();
    const restartConfirm = await InputService.getValidRestartConfirm();
    if (restartConfirm === YES) await this.start();
  }

  async #runLottoGame() {
    const purchaseAmount = await InputService.getValidPurchaseAmount();
    const lottos = issueLottos(purchaseAmount);
    OutputView.printIssuedLottos(lottos);

    const winningNumbers = await InputService.getValidWinningNumbers();
    const bonusNumber = await InputService.getValidBonusNumber(winningNumbers);

    const winningStatistics = new WinningStatistics(lottos);
    winningStatistics.calculateWinningResults(winningNumbers, bonusNumber);

    OutputView.printStatistics(winningStatistics.statistics);
    OutputView.printProfitRatio(
      winningStatistics.calculateProfitRatio(purchaseAmount),
    );
  }
}

export default Controller;
