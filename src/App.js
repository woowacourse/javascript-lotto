<<<<<<< HEAD
import { RESTART } from './constants/Configurations.js';
import LottoMachine from './domains/LottoMachine.js';
import retryUntilValid from './utils/retryUntilValid.js';
=======
import { PURCHASE_PRICE, RESTART, SEPARATOR } from './constants/CONFIGURATIONS.js';
import LottoMachine from './domains/LottoMachine.js';
import WinningResult from './domains/WinningResult.js';
import retryUntilValid from './utils/retryUntilValid.js';
import { BonusNumberValidator } from './validators/BonusNumberValidator.js';
import { PurchasePriceValidator } from './validators/PurchasePriceValidator.js';
import RestartValidator from './validators/RestartValidator.js';
import { WinningNumbersValidator } from './validators/WinningNumbersValidator.js';
>>>>>>> 0f9ff21ed0cd6104c06a2b5d22feb4bc389fa693
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';

class App {
  async run() {
    await this.#start();
<<<<<<< HEAD
    const restartInput = await retryUntilValid(InputView.enterRestart);
=======
    const restartInput = await retryUntilValid(this.#getRestart);
>>>>>>> 0f9ff21ed0cd6104c06a2b5d22feb4bc389fa693

    if (restartInput.toLowerCase() === RESTART.YES) {
      await this.run();
    }
  }

  async #start() {
<<<<<<< HEAD
    const lottoMachine = await this.#processLottoPurchase();
    const [winningNumbers, bonusNumber] = await this.#preProcess();
    const [winningCounts, profitRate] = lottoMachine.calculateResult(
      winningNumbers,
      bonusNumber,
    );

=======
    const [lottoPurchasePrice, lottoMachine] = await this.#processLottoPurchase();
    const winningResult = await this.#preProcess();

    const winningCounts = winningResult.calculate(lottoMachine.lottos);
    const profitRate = winningResult.calculateProfitRate(lottoPurchasePrice, winningCounts);
>>>>>>> 0f9ff21ed0cd6104c06a2b5d22feb4bc389fa693
    OutputView.printResult(winningCounts, profitRate);
  }

  async #processLottoPurchase() {
<<<<<<< HEAD
    const lottoPurchasePrice = await retryUntilValid(
      InputView.enterPurchasePrice,
    );
    const lottoMachine = new LottoMachine(lottoPurchasePrice);
    OutputView.printPurchaseLottos(lottoMachine.lottos);

    return lottoMachine;
  }

  async #preProcess() {
    const winningNumbers = await retryUntilValid(InputView.enterWinningNumbers);
    const bonusNumber = await retryUntilValid(() =>
      InputView.enterBonusNumber(winningNumbers),
    );

    return [winningNumbers, bonusNumber];
=======
    const [lottoPurchasePrice, lottoCount] = await retryUntilValid(this.#getPurchasePrice);
    const lottoMachine = new LottoMachine(lottoCount);
    OutputView.printPurchaseLottos(lottoMachine.lottos);

    return [lottoPurchasePrice, lottoMachine];
  }

  async #preProcess() {
    const winningNumbers = await retryUntilValid(this.#getWinningNumbers);
    const bonusNumber = await retryUntilValid(() => {
      return this.#getBonusNumber(winningNumbers);
    });

    return new WinningResult(winningNumbers, bonusNumber);
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
>>>>>>> 0f9ff21ed0cd6104c06a2b5d22feb4bc389fa693
  }
}

export default App;
