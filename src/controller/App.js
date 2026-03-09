import LottoController from "./LottoController.js";
import OutputView from "../view/OutputView.js";
import InputView from "../view/InputView.js";
import retry from "../utils/retry.js";
import { LOTTO_PRICE } from "../constants/lottoInfo.js";

class App {
  async run() {
    while (true) {
      const purchasedPrice = await retry(() => InputView.inputPrice());

      const lottoCount = purchasedPrice / LOTTO_PRICE;

      const lottoController = new LottoController(lottoCount);
      const purchasedLottos = lottoController.issueLottos();
      OutputView.printLotto(purchasedLottos);

      const winningLotto = await retry(() => InputView.inputWinningNums());
      const bonusNum = await retry(() => InputView.inputBonusNum(winningLotto));
      lottoController.updateWinningResult(winningLotto, bonusNum);

      const { rankCount, profitRate } = lottoController.getWinningResult();
      OutputView.printResult(rankCount, profitRate);

      const restartAnswer = await retry(() => InputView.inputRestartAnswer());
      if (restartAnswer === "n") break;
    }

    InputView.close();
  }
}

export default App;
