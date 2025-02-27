import Input from "../views/Input.js";
import Output from "../views/Output.js";
import issueLottos from "../domains/issueLottos.js";
import LottoGame from "../domains/lottoGame.js";
import { CONFIRMATION } from "../constants/validateConstants.js";

class Controller {
  constructor() {
    this.lottoGame = new LottoGame();
  }

  async start() {
    await this.#runLottoGame();
    const restartConfirm = await Input.readRestartConfirm();
    if (restartConfirm === CONFIRMATION.YES) await this.start();
  }

  async #runLottoGame() {
    const purchaseAmount = await Input.readPurchaseAmount();

    const lottoCount = Math.floor(purchaseAmount / 1000);
    if (lottoCount < 1) {
      Output.printError("구매 금액이 부족합니다.");
      return;
    }

    const lottos = issueLottos(purchaseAmount);
    Output.printIssuedLottos(lottos);

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

    if (winningNumbers.includes(bonusNumber)) {
      Output.printError("보너스 번호는 당첨 번호와 중복될 수 없습니다.");
      return this.#getWinningAndBonusNumbers();
    }

    return { winningNumbers, bonusNumber };
  }
}

export default Controller;
