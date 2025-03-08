import LottoCalculator from "./domain/lottoCalculator.js";
import LottoMachine from "./domain/lottoMachine.js";
import inputView from "./Input.js";
import outputView from "./output.js";

class App {
  #lottoCalculator;

  async run() {
    this.purchaseMoney = await inputView.getPurchaseMoney();

    const lottoMachine = new LottoMachine();
    const lottoCount = lottoMachine.getLottoCount(this.purchaseMoney);
    this.lottos = lottoMachine.drawLotto(lottoCount);

    outputView.printLottoCount(lottoCount);
    outputView.printLotto(this.lottos);

    const winningNumbers = await inputView.getWinningNumbers();
    const bonusNumber = await inputView.getBonusNumber(winningNumbers);

    this.#lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);
  }

  calculateResult(lottos, purchaseMoney) {
    const prize = this.#lottoCalculator.calculatePrize(lottos);
    const totalPrice = this.#lottoCalculator.calculateTotalPrice(prize);
    const profit = this.#lottoCalculator.calculateProfit(
      totalPrice,
      purchaseMoney
    );

    this.prize = prize;
    this.totalPrice = totalPrice;
    this.profit = profit;
  }

  printResult() {
    outputView.printResult(this.prize, this.profit);
  }

  async restart() {
    const restartAnswer = await inputView.getRestartRequest();
    if (restartAnswer === "y") {
      await this.run();
    }
  }
}

export default App;
