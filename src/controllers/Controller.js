import Input from "../views/Input.js";
import Output from "../views/Output.js";
import LottoGame from "../domains/LottoGame.js";
import { YES } from "../constants/validateConstants.js";

class Controller {
  constructor(lottoGame) {
    this.lottoGame = lottoGame;
  }

  async start() {
    await this.#runLottoGame();
    const restartConfirm = await Input.readRestartConfirm();
    if (restartConfirm === YES) await this.start();
  }

  async #runLottoGame() {
    const purchaseAmount = await Input.readPurchaseAmount();
    const lottos = this.lottoGame.issueLottos(purchaseAmount);
    Output.printIssuedLottos(lottos); // 객체이므로 new Output() 없이 사용!

    const { winningNumbers, bonusNumber } =
      await this.#getWinningAndBonusNumbers();

    const winningStatistics = this.lottoGame.calculateResults(
      lottos,
      winningNumbers,
      bonusNumber
    );

    Output.printStatistics(winningStatistics.statistics);
    Output.printProfitRatio(
      winningStatistics.calculateProfitRatio(purchaseAmount)
    );
  }

  async #getWinningAndBonusNumbers() {
    const winningNumbers = await Input.readWinningNumbers();
    const bonusNumber = await Input.readBonusNumber();
    return { winningNumbers, bonusNumber };
  }
}

export default Controller;
