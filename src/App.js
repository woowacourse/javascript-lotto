import LottoCompany from './domain/LottoCompany.js';
import LottoShop from './domain/LottoShop.js';
import { calculateProfitRate, retryUntilSuccess } from './lib/utils.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';

class App {
  async run() {
    const purchaseAmount = await this.#retryReadUntilSuccess(InputView.readPurchaseAmount);
    const purchaseCount = LottoShop.calculateLottoCount(purchaseAmount);
    OutputView.printPurchaseCount(purchaseCount);
    const purchasedLottos = LottoShop.createLotto(purchaseCount);

    OutputView.printPurchasedLottos(purchasedLottos);

    const winNumbers = await this.#retryReadUntilSuccess(InputView.readWinNumbers);

    const bonusNumber = await this.#retryReadUntilSuccess(() => InputView.readBonusNumber(winNumbers));

    const lottoCompany = new LottoCompany(winNumbers, bonusNumber);
    const lottoRanks = lottoCompany.calculateLottoRanks(purchasedLottos);

    const totalPrize = lottoCompany.calculateTotalProfit(lottoRanks);
    const profitRate = calculateProfitRate(totalPrize, purchaseAmount);

    OutputView.printStatistics(lottoRanks);
    OutputView.printProfitRate(profitRate);

    const isRetry = await this.#retryReadUntilSuccess(InputView.readRetry);
    if (isRetry) await this.run();
  }

  #retryReadUntilSuccess(callbackFunction) {
    return retryUntilSuccess(callbackFunction, (error) => OutputView.printErrorMessage(error));
  }
}

export default App;
