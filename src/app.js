// App.js
import { RANK_INFO_TABLE } from "./constant/rank.js";
import LottoCalculator from "./domain/lottoCalculator.js"; // 경로가 올바른지 확인
import LottoMachine from "./domain/lottoMachine.js";
import inputView from "./view/InputView.js";
import outputView from "./view/outputView.js";

class App {
  #lottoCalculator;

  async run() {
    const purchaseMoney = await inputView.getPurchaseMoney();

    const lottoMachine = new LottoMachine();

    const lottoCount = lottoMachine.getLottoCount(purchaseMoney);
    const lottos = lottoMachine.drawLotto(lottoCount);
    outputView.printLottoCount(lottoCount);
    outputView.printLotto(lottos);

    const winningNumbers = await inputView.getWinningNumbers();
    const bonusNumber = await inputView.getBonusNumber(winningNumbers);

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
    this.#lottoCalculator.prize.forEach((rankLottos, index) => {
      const rank = index + 1;
      const info = RANK_INFO_TABLE[rank];
      console.log(
        `${info.message} (${info.price.toLocaleString()}원) - ${
          rankLottos.lottos.length
        }개`
      );
    });
    console.log(`총 수익률은 ${this.#lottoCalculator.profit}%입니다.`);
  }

  async restart() {
    const restartAnswer = await inputView.getRestartRequest();
    if (restartAnswer === "y") {
      await this.run();
    }
  }
}

export default App;
