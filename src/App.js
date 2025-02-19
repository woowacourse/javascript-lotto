import {
  PURCHASE_PRICE,
  RESTART,
  SEPARATOR,
} from "./constants/CONFIGURATIONS.js";
import LottoMachine from "./domains/LottoMachine.js";
import WinningResult from "./domains/WinningResult.js";
import retryUntilValid from "./utils/retryUntilValid.js";
import { BonusNumberValidator } from "./validators/BonusNumberValidator.js";
import { PurchasePriceValidator } from "./validators/PurchasePriceValidator.js";
import { RestartValidator } from "./validators/RestartValidator.js";
import { WinningNumbersValidator } from "./validators/WinningNumbersValidator.js";
import InputView from "./views/InputView.js";
import OutputView from "./views/OutputView.js";

class App {
  async run() {
    while (true) {
      await this.#start();
      const restartInput = await retryUntilValid(this.#getRestart);

      if (restartInput.toLowerCase() !== RESTART.YES) {
        break;
      }
    }
  }

  async #start() {
    const [lottoPurchasePrice, lottoCount] = await retryUntilValid(
      this.#getPurchasePrice
    );
    const lottoMachine = new LottoMachine(lottoCount);
    OutputView.printPurchaseLottos(lottoMachine.lottos);

    const winningNumbers = await retryUntilValid(this.#getWinningNumbers);
    const bonusNumber = await retryUntilValid(() =>
      this.#getBonusNumber(winningNumbers)
    );
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
    const lottoCount = lottoPurchasePrice / PURCHASE_PRICE.UNIT;
    return [lottoPurchasePrice, lottoCount];
  }

  async #getWinningNumbers() {
    const winningNumbers = await InputView.enterWinningNumbers();
    const splittedWinningNumbers = winningNumbers.split(SEPARATOR).map(Number);
    WinningNumbersValidator.validate(splittedWinningNumbers);
    return splittedWinningNumbers;
  }

  async #getBonusNumber(winningNumbers) {
    const bonusNumber = await InputView.enterBonusNumber();
    const transformedBonusNumber = Number(bonusNumber);
    BonusNumberValidator.validate(transformedBonusNumber, winningNumbers);
    return transformedBonusNumber;
  }

  async #getRestart() {
    const restartInput = await InputView.enterRestart();
    RestartValidator.validate(restartInput);
    return restartInput;
  }
}

export default App;
