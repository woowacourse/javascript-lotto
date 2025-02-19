//@ts-check

import {
  LOTTO_LENGTH,
  LOTTO_PRICE,
  LOTTO_RANK,
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
  OUTPUT_MESSAGES,
} from "./lib/constants.js";
import {
  generateRandomNumber,
  generateUniqueNumberArray,
  getIntersectCount,
} from "./lib/utils.js";
import InputView from "./views/InputView.js";
import OutputView from "./views/OutputView.js";

class App {
  constructor() {}

  async run() {
    const purchaseAmount = await InputView.readPurchaseAmount();
    const purchaseCount = purchaseAmount / LOTTO_PRICE;

    const purchasedLottos = this.createLotto(purchaseCount);

    OutputView.printPurchasedLottos(purchasedLottos);

    const winNumbers = await InputView.readWinNumbers();
    const bonusNumber = await InputView.readBonusNumber();

    const lottoRanks = purchasedLottos.map((lotto) => {
      const winningLottoCount = getIntersectCount(lotto, winNumbers);
      const isBonusNumber = lotto.includes(bonusNumber);

      const rank = this.getRank(winningLottoCount, isBonusNumber);
      return rank;
    });

    const totalPrize = this.calculateTotalProfit(lottoRanks);
    const profitRate = this.calculateProfitRate(totalPrize, purchaseAmount);

    OutputView.printStatistics(lottoRanks);
    OutputView.printProfitRate(profitRate);

    const isRetry = await InputView.readRetry();
    if (isRetry) await this.run();
  }

  calculateProfitRate(profit, price) {
    const profitRate = ((profit / price) * 100).toFixed(1);
    return Number(profitRate);
  }

  calculateTotalProfit(lottoRanks) {
    return lottoRanks.reduce((prev, cur) => {
      if (cur === "당첨 없음") return prev;
      else {
        return prev + LOTTO_RANK[cur].prize;
      }
    }, 0);
  }

  getRank(winningLottoCount, isBonusNumber) {
    const rank = Object.keys(LOTTO_RANK).find((rank) => {
      const info = LOTTO_RANK[rank];

      if (info.winNumber === winningLottoCount) {
        if (!info.isBonusNumber) return true;
        else if (isBonusNumber) return true;
      }
      return false;
    });
    if (rank === undefined) {
      return "당첨 없음";
    }
    return rank;
  }

  createLottoNumber() {
    return generateUniqueNumberArray(
      MIN_LOTTO_NUMBER,
      MAX_LOTTO_NUMBER,
      LOTTO_LENGTH
    );
  }

  createLotto(purchaseCount) {
    return Array.from({ length: purchaseCount }, () => {
      return this.createLottoNumber().sort((a, b) => a - b);
    });
  }
}

export default App;
