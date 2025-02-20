import LottoCalculator, { rankInfoTable } from "./domain/lottoCalculator.js";
import LottoMachine from "./domain/lottoMachine.js";
import InputView from "./view/InputView.js";
import OutputView from "./view/outputView.js";

class App {
  #lottoCalculator;

  async run() {
    const money = await InputView.getPurchaseMoney();

    const lottoMachine = new LottoMachine();

    const lottoCount = lottoMachine.getLottoCount(money);
    const lottos = lottoMachine.drawLotto(lottoCount);
    OutputView.printLotto(lottos);

    OutputView.printLottoCount(lottoCount);
    const winningNumbers = await InputView.getWinningNumbers();
    const bonusNumber = await InputView.getBonusNumber(winningNumbers);

    this.#lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);

    lottos.forEach((lotto) => {
      this.#lottoCalculator.calculatePrize(lotto);
    });
    this.#lottoCalculator.calculateTotalPrice();
    const profit = this.#lottoCalculator.calculateProfit(money);

    this.printResult(profit);

    const restartAnswer = await InputView.getRestartRequest();

    if (restartAnswer === "y") {
      await this.run();
    }
  }

  printResult(profit) {
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
    console.log(`총 수익률은 ${profit}%입니다.`);
  }
}

export default App;
