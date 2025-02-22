import { RESTART } from './constants/CONFIGURATIONS.js';
import {
  getBonusNumber,
  getPurchasePrice,
  getRestart,
  getWinningNumbers,
} from './domains/InputProcessor.js';
import LottoMachine from './domains/LottoMachine.js';
import WinningResult from './domains/WinningResult.js';
import retryUntilValid from './utils/retryUntilValid.js';
import OutputView from './views/OutputView.js';

const App = {
  async run() {
    await this.start();
    const restartInput = await retryUntilValid(getRestart);

    if (restartInput.toLowerCase() === RESTART.YES) {
      await this.run();
    }
  },

  async start() {
    const { lottoPurchasePrice, lottos } = await this.processLottoPurchase();
    const winningResult = await this.generateWinningResult();

    const winningCounts = winningResult.calculate(lottos);
    const profitRate = winningResult.calculateProfitRate(lottoPurchasePrice, winningCounts);
    OutputView.printResult(winningCounts, profitRate);
  },

  async processLottoPurchase() {
    const { lottoPurchasePrice, lottoCount } = await retryUntilValid(getPurchasePrice);
    const lottoMachine = new LottoMachine(lottoCount);
    OutputView.printPurchaseLottos(lottoMachine.lottos);

    return { lottoPurchasePrice, lottos: lottoMachine.lottos };
  },

  async generateWinningResult() {
    const winningNumbers = await retryUntilValid(getWinningNumbers);
    const bonusNumber = await retryUntilValid(() => {
      return getBonusNumber(winningNumbers);
    });

    return new WinningResult(winningNumbers, bonusNumber);
  },
};

export default App;
