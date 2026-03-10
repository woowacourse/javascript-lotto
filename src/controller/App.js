import LottoController from "./LottoController.js";
import OutPutView from "../view/OutputView.js";
import InputView from "../view/InputView.js";
import retry from "../utils/retry.js";
import Lotto from "../model/Lotto.js";

class App {
  async run() {
    while (true) {
      const lottoController = await this.#prepareLottoGame();

      await this.#playLottoGame(lottoController);

      this.#showGameResult(lottoController);

      if (await this.#retryGame()) break;
    }
    InputView.close();
  }

  async #prepareLottoGame() {
    const purchasedPrice = await retry(() => InputView.inputPrice());
    const lottoCount = purchasedPrice / 1000;
    const lottoController = new LottoController(lottoCount);

    const purchasedLottos = lottoController.issueLottos();
    OutPutView.printLotto(purchasedLottos);

    return lottoController;
  }

  async #playLottoGame(lottoController) {
    const winningNums = await retry(() => InputView.inputWinningNums());
    const winningLotto = new Lotto(winningNums);

    const bonusNum = await retry(() => InputView.inputBonusNum(winningLotto.getNumbers()));
    lottoController.updateWinningResult(winningLotto, bonusNum);
  }

  #showGameResult(lottoController) {
    const { rankCount, profitRate } = lottoController.getWinningResult();
    OutPutView.printResult(rankCount, profitRate);
  }

  async #retryGame() {
    const restartAnswer = await retry(() => InputView.inputRestartAnswer());
    return restartAnswer === "n"
  }
}

export default App;
