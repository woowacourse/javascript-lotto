//@ts-check
import LottoCompany from './domain/LottoCompany.js';
import LottoShop from './domain/LottoShop.js';
import { calculateProfitRate } from './util/calculator.js';
import { retryUntilSuccess } from './util/io.js';
import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';

class App {
  async run() {
    const purchaseAmount = await this.#retryReadUntilSuccess(InputView.readPurchaseAmount);
    const purchasedLottos = LottoShop.purchaseLotto(purchaseAmount);
    OutputView.printPurchaseCount(purchasedLottos.length);

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
