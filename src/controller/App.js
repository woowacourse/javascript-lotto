import LottoController from "./LottoController.js";
import OutPutView from "../view/OutputView.js";
import InputView from "../view/InputView.js";
import retry from "../utils/retry.js";

class App {
  async run() {
    while (true) {
      const price = await retry(() => InputView.inputPrice());

      const amount = price / 1000;

      const lottoController = new LottoController(amount);
      const lottos = lottoController.issueLottos();
      OutPutView.printLotto(lottos);

      const winningLotto = await retry(() => InputView.inputWinningNums());
      const bonusNum = await retry(() => InputView.inputBonusNum(winningLotto));
      lottoController.updateWinningResult(winningLotto, bonusNum);

      const { rankCount, profitRate } = lottoController.getWinningResult();
      OutPutView.printResult(rankCount, profitRate);

      const restartAnswer = await retry(() => InputView.inputRestartAnswer());
      if (restartAnswer == "n") break;
    }

    InputView.close();
  }
}

export default App;
