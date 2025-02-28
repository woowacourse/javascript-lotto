import { RESTART } from '../common/constants/Configurations.js';
import LottoMachine from '../common/domains/LottoMachine.js';
import retryUntilValid from '../common/utils/retryUntilValid.js';
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
    const lottoMachine = await this.#processLottoPurchase();
    const [winningNumbers, bonusNumber] = await this.#preProcess();
    const [winningCounts, profitRate] = lottoMachine.calculateResult(
      winningNumbers,
      bonusNumber,
    );

    OutputView.printResult(winningCounts, profitRate);
  }

  async #processLottoPurchase() {
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
  }
}

export default App;
