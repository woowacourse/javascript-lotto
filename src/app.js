import Validator from "./Validator/validator.js";
import InputHandler from "./view/InputHandler.js";
import OutputView from "./view/outputView.js";
import LottoMachine from "./domain/lottoMachine.js";
import LottoCalculator, { rankInfoTable } from "./domain/lottoCalculator.js";

class App {
  #lottoCalculator;

  async getPurchaseMoney() {
    return InputHandler({
      inputMessage: "> 구입금액을 입력해 주세요. ",
      parser: Number,
      validator: Validator.validatePurchaseMoney,
    });
  }

  async getWinningNumbers() {
    return InputHandler({
      inputMessage: "> 당첨 번호를 입력해 주세요. ",
      parser: (input) => input.split(",").map((string) => Number(string)),
      validator: Validator.validateWinningNumbers,
    });
  }

  async getBonusNumber(winningNumbers) {
    return InputHandler({
      inputMessage: "> 보너스 번호를 입력해 주세요. ",
      parser: Number,
      validator: (bonusNumber) =>
        Validator.validateBonusNumber(winningNumbers, bonusNumber),
    });
  }

  async getRestartRequest() {
    return InputHandler({
      inputMessage: "> 다시 시작하시겠습니까? (y/n)",
      validator: Validator.validateRestartRequest,
    });
  }

  async run() {
    const outputView = new OutputView();
    const money = await this.getPurchaseMoney();

    const lottoMachine = new LottoMachine();

    const lottoCount = lottoMachine.getLottoCount(money);
    const lottos = lottoMachine.drawLotto(lottoCount);
    outputView.printLotto(lottos);

    outputView.printLottoCount(lottoCount);
    const winningNumbers = await this.getWinningNumbers();
    const bonusNumber = await this.getBonusNumber(winningNumbers);

    this.#lottoCalculator = new LottoCalculator(winningNumbers, bonusNumber);

    lottos.forEach((lotto) => {
      this.#lottoCalculator.calculatePrize(lotto);
    });
    this.#lottoCalculator.calculateTotalPrice();
    const profit = this.#lottoCalculator.calculateProfit(money);

    this.printResult(profit);

    const restartAnswer = await this.getRestartRequest();

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
