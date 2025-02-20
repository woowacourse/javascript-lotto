import LottoCalculator, { rankInfoTable } from "./domain/lottoCalculator.js";
import LottoMachine from "./domain/lottoMachine.js";
import InputView from "./view/InputView.js";
import OutputView from "./view/outputView.js";

class App {
  #lottoCalculator;

  async run() {
    const purchaseMoney = await InputView.getPurchaseMoney();

    const lottoMachine = new LottoMachine();

    const lottoCount = lottoMachine.getLottoCount(purchaseMoney);
    const lottos = lottoMachine.drawLotto(lottoCount);
    OutputView.printLottoCount(lottoCount);
    OutputView.printLotto(lottos);

    const winningNumbers = await InputView.getWinningNumbers();
    const bonusNumber = await InputView.getBonusNumber(winningNumbers);
    this.#lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);

    this.calculateResult(lottos, purchaseMoney);
    this.printResult();

    await this.restart();
  }

  calculateResult(lottos, purchaseMoney) {
    lottos.forEach((lotto) => {
      this.#lottoCalculator.calculatePrize(lotto);
    });
    this.#lottoCalculator.calculateTotalPrice();
    this.#lottoCalculator.calculateProfit(purchaseMoney);
  }

  printResult() {
    console.log("당첨 통계");
    console.log("--------------------");
    this.#lottoCalculator.prize.forEach((rankLottos, rank) => {
      const info = rankInfoTable[rank];
      console.log(
        `${info.message} (${info.price.toLocaleString()}원) - ${
          rankLottos.length
        }개`
      );
    });
    console.log(`총 수익률은 ${this.#lottoCalculator.profit}%입니다.`);
  }

  async restart() {
    const restartAnswer = await InputView.getRestartRequest();
    if (restartAnswer === "y") {
      await this.run();
    }
  }
}

export default App;
