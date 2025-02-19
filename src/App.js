//@ts-check

import LottoCompany from "./domain/LottoCompany.js";
import LottoShop from "./domain/LottoShop.js";
import { LOTTO_PRICE, LOTTO_RANK } from "./lib/constants.js";
import { calculateProfitRate } from "./lib/utils.js";
import InputView from "./views/InputView.js";
import OutputView from "./views/OutputView.js";

class App {
  async run() {
    const purchaseAmount = await InputView.readPurchaseAmount();
    const purchaseCount = purchaseAmount / LOTTO_PRICE;

    OutputView.printPurchaseCount(purchaseCount);
    const purchasedLottos = LottoShop.createLotto(purchaseCount);

    OutputView.printPurchasedLottos(purchasedLottos);

    const winNumbers = await InputView.readWinNumbers();
    const bonusNumber = await InputView.readBonusNumber(winNumbers);

    const lottoCompany = new LottoCompany(winNumbers, bonusNumber);
    const lottoRanks = lottoCompany.calculateLottoRanks(purchasedLottos);

    const totalPrize = LottoCompany.calculateTotalProfit(lottoRanks);
    const profitRate = calculateProfitRate(totalPrize, purchaseAmount);

    OutputView.printStatistics(lottoRanks);
    OutputView.printProfitRate(profitRate);

    const isRetry = await InputView.readRetry();
    if (isRetry) await this.run();
  }
}

export default App;
