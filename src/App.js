import LottoMachine from "./domains/LottoMachine.js";
import WinningResult from "./domains/WinningResult.js";
import { BonusNumberValidator } from "./validators/BonusNumberValidator.js";
import { PurchasePriceValidator } from "./validators/PurchasePriceValidator.js";
import { WinningNumbersValidator } from "./validators/WinningNumbersValidator.js";
import InputView from "./views/InputView.js";
import OutputView from "./views/OutputView.js";

class App {
  async run() {
    const [lottoPurchasePrice, lottoCount] = await this.#getPurchasePrice();
    const lottoMachine = new LottoMachine(lottoCount);
    OutputView.printPurchaseLottos(lottoMachine.lottos);

    const winningNumbers = await this.#getWinningNumbers();
    const bonusNumber = await this.#getBonusNumber();
    const winningResult = new WinningResult(winningNumbers, bonusNumber);

    const winningCounts = winningResult.calculate(lottoMachine.lottos);
    const profitRate = winningResult.calculateProfitRate(
      lottoPurchasePrice,
      winningCounts
    );
    OutputView.printResult(winningCounts, profitRate);
  }

  async #getPurchasePrice() {
    const lottoPurchasePrice = await InputView.enterPurchasePrice();
    PurchasePriceValidator.validate(Number(lottoPurchasePrice));
    const lottoCount = lottoPurchasePrice / 1000;
    return [lottoPurchasePrice, lottoCount];
  }

  async #getWinningNumbers() {
    const winningNumbers = await InputView.enterWinningNumbers();
    const splittedWinningNumbers = winningNumbers.split(",").map(Number);
    WinningNumbersValidator.validate(splittedWinningNumbers);
    return splittedWinningNumbers;
  }

  async #getBonusNumber() {
    const bonusNumber = await InputView.enterBonusNumber();
    const transformedBonusNumber = Number(bonusNumber);
    BonusNumberValidator.validate(
      transformedBonusNumber,
      splittedWinningNumbers
    );
    return transformedBonusNumber;
  }
}

export default App;
