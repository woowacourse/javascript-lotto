//@ts-check

import { LOTTO_RANK } from "../lib/constants.js";

class OutputView {
  static #print(message) {
    console.log(message);
  }

  static printPurchasedLottos(purchasedLottos) {
    purchasedLottos.forEach((lotto) => this.#print(lotto));
  }

  static printPurchaseCount(purchaseCount) {
    this.#print(`${purchaseCount}개를 구매했습니다.`);
  }

  static printStatistics(lottoRanks) {
    this.#print("당첨 통계");
    this.#print("------------");

    [...Object.keys(LOTTO_RANK)].reverse().forEach((rank) => {
      const bonusOutput = this.#getBonusOutput(LOTTO_RANK[rank].isBonusNumber);
      const rankCount = lottoRanks.filter(
        (lottoRank) => lottoRank === rank
      ).length;
      this.#print(
        `${LOTTO_RANK[rank].winNumber}개 일치${bonusOutput} (${LOTTO_RANK[
          rank
        ].prize.toLocaleString()}) - ${rankCount}개`
      );
    });
  }
  static #getBonusOutput(isBonusNumber) {
    if (isBonusNumber) {
      return ", 보너스 볼 일치";
    }
    return "";
  }

  static printProfitRate(profitRate) {
    console.log(`총 수익률은 ${profitRate}%입니다.`);
  }
}

export default OutputView;
