import LottoController from "./LottoController.js";
import OutputView from "../view/OutputView.js";
import InputView from "../view/InputView.js";
import retry from "../utils/retry.js";
import { LOTTO_PRICE } from "../constants/lottoInfo.js";

class App {
  constructor() {
    this.lottoController = new LottoController();
  }

  async run() {
    while (true) {
      const purchasedPrice = await retry(() => InputView.inputPrice());

      const lottoCount = purchasedPrice / LOTTO_PRICE;

      const purchasedLottos = this.lottoController.issueLottos(lottoCount);
      OutputView.printLotto(purchasedLottos);

      const winningLotto = await retry(() => InputView.inputWinningNums());
      const bonusNum = await retry(() => InputView.inputBonusNum(winningLotto));
      this.lottoController.updateWinningResult(winningLotto, bonusNum);

      const { rankCount, profitRate } = this.lottoController.getWinningResult();
      OutputView.printResult(rankCount, profitRate);

      const restartAnswer = await retry(() => InputView.inputRestartAnswer());
      if (restartAnswer === "n") break;
    }

    InputView.close();
  }
}

export default App;
