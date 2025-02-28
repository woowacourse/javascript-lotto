import LottoMachine from '../domains/LottoMachine.js';
import WinningResult from '../domains/WinningResult.js';
import OutputView from '../views/web/OutputView.js';
import InputView from '../views/web/InputView.js';
import retryUntilValidWithAlert from '../utils/retryUntilValidWithAlert.js';

const WebController = {
  async start() {
    const { purchasePrice, lottos } = await this.processLottoPurchase();
    const winningResult = await this.generateWinningResult();
    const winningCounts = winningResult.calculate(lottos);
    const profitRate = winningResult.calculateProfitRate(purchasePrice, winningCounts);

    OutputView.showModal(winningCounts, profitRate);
  },

  async processLottoPurchase() {
    const { purchasePrice, lottoCount } = await retryUntilValidWithAlert(
      async () => await InputView.enterPurchasePrice(),
    );
    const lottoMachine = new LottoMachine(lottoCount);
    OutputView.printPurchaseLottos(lottoCount, lottoMachine.lottos);

    return { purchasePrice, lottos: lottoMachine.lottos };
  },

  async generateWinningResult() {
    const { winningNumbers, bonusNumber } = await retryUntilValidWithAlert(
      async () => await InputView.enterWinningAndBonusNumber(),
    );
    return new WinningResult(winningNumbers, bonusNumber);
  },
};

export default WebController;
