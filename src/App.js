//@ts-check

import LottoCompany from "./domain/LottoCompany.js";
import LottoShop from "./domain/LottoShop.js";
import { LOTTO_PRICE, LOTTO_RANK } from "./lib/constants.js";
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

    const totalPrize = this.#calculateTotalProfit(lottoRanks);
    const profitRate = this.#calculateProfitRate(totalPrize, purchaseAmount);

    OutputView.printStatistics(lottoRanks);
    OutputView.printProfitRate(profitRate);

    const isRetry = await InputView.readRetry();
    if (isRetry) await this.run();
  }

  #calculateProfitRate(profit, price) {
    const profitRate = ((profit / price) * 100).toFixed(1);
    return Number(profitRate);
  }

  #calculateTotalProfit(lottoRanks) {
    return lottoRanks.reduce((prev, cur) => {
      if (cur === "당첨 없음") return prev;
      else {
        return prev + LOTTO_RANK[cur].prize;
      }
    }, 0);
  }
}

export default App;
