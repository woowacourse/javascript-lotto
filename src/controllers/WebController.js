import { RESTART } from '../constants/CONFIGURATIONS.js';
import {
  getPurchasePrice,
  getRestart,
  getWiningAndBonusNumbers,
} from '../domains/InputProcessor.js';
import LottoMachine from '../domains/LottoMachine.js';
import WinningResult from '../domains/WinningResult.js';
import retryUntilValid from '../utils/retryUntilValid.js';
import OutputView from '../views/web/OutputView.js';

const WebController = {
  async run() {
    // await this.start();
    // const restartInput = await retryUntilValid(() => getRestart('web'));

    // if (restartInput.toLowerCase() === RESTART.YES) {
    //   await this.run();
    // }

    await this.start();
  },

  async start() {
    const { lottoPurchasePrice, lottos } = await this.processLottoPurchase();
    const winningResult = await this.generateWinningResult();
    const winningCounts = winningResult.calculate(lottos);
    const profitRate = winningResult.calculateProfitRate(lottoPurchasePrice, winningCounts);
    console.log(winningCounts, profitRate);
    // OutputView.printResult(winningCounts, profitRate);
  },

  async processLottoPurchase() {
    const { lottoPurchasePrice, lottoCount } = await retryUntilValid(() => getPurchasePrice('web'));
    const lottoMachine = new LottoMachine(lottoCount);
    OutputView.printPurchaseLottos(lottoCount, lottoMachine.lottos);

    return { lottoPurchasePrice, lottos: lottoMachine.lottos };
  },

  async generateWinningResult() {
    const { winningNumbers, bonusNumber } = await retryUntilValid(() => getWiningAndBonusNumbers());
    return new WinningResult(winningNumbers, bonusNumber);
  },
};

export default WebController;
