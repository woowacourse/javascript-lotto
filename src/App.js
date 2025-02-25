import { RESTART } from './constants/CONFIGURATIONS.js';
import LottoMachine from './domains/LottoMachine.js';
import retryUntilValid from './utils/retryUntilValid.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';

class App {
  async run() {
    await this.#start();
    const restartInput = await retryUntilValid(InputView.enterRestart);

    if (restartInput.toLowerCase() === RESTART.YES) {
      await this.run();
    }
  }

  async #start() {
    const [lottoPurchasePrice, lottoMachine] =
      await this.#processLottoPurchase();
    const [winningNumbers, bonusNumber] = await this.#preProcess();
    const [winningCounts, profitRate] = lottoMachine.calculateResult(
      {
        winningNumbers,
        bonusNumber,
      },
      lottoPurchasePrice,
    );

    OutputView.printResult(winningCounts, profitRate);
  }

  async #processLottoPurchase() {
    const lottoPurchasePrice = await retryUntilValid(
      InputView.enterPurchasePrice,
    );
    const lottoMachine = new LottoMachine(lottoPurchasePrice);
    OutputView.printPurchaseLottos(lottoMachine.lottos);

    return [lottoPurchasePrice, lottoMachine];
  }

  async #preProcess() {
    const winningNumbers = await retryUntilValid(InputView.enterWinningNumbers);
    const bonusNumber = await retryUntilValid(() =>
      InputView.enterBonusNumber(winningNumbers),
    );

    return [winningNumbers, bonusNumber];
  }
}

export default App;
