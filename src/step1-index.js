import LottoController from "./Controller/LottoController.js";
import OutPutView from "./view/OutputView.js";
import InputView from "./view/InputView.js";

class App {
  async run() {
    const price = await InputView.inputPrice();

    const amount = price / 1000;

    const lottoController = new LottoController(amount);
    const lottos = lottoController.issueLottos();
    OutPutView.printLotto(lottos);

    const winningLotto = await InputView.inputWinningNums();
    const bonusNum = await InputView.inputBonusNum();
    lottoController.updateWinningResult(winningLotto, bonusNum);

    const { rankCount, profitRate } = lottoController.getWinningResult();
    OutPutView.printResult(rankCount, profitRate);
  }
}

const app = new App();
await app.run();
