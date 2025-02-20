import { LOTTO_RANK, OUTPUT_MESSAGES } from '../lib/constants.js';
import { calculateMatchCount } from '../lib/utils.js';

class OutputView {
  static #print(message) {
    console.log(message);
  }

  static printPurchasedLottos(purchasedLottos) {
    purchasedLottos.forEach((lotto) => this.#print(lotto.numbers));
  }

  static printPurchaseCount(purchaseCount) {
    this.#print(`${purchaseCount}개를 구매했습니다.`);
  }

  static printStatistics(lottoRanks) {
    this.#print(OUTPUT_MESSAGES.statistics());
    this.#print(OUTPUT_MESSAGES.divider());

    [...Object.keys(LOTTO_RANK)].reverse().forEach((rank) => {
      const bonusOutput = this.#getBonusOutput(LOTTO_RANK[rank].isBonusNumber);
      const rankCount = calculateMatchCount(lottoRanks, rank);
      this.#print(
        `${LOTTO_RANK[rank].winNumber}개 일치${bonusOutput} (${LOTTO_RANK[
          rank
        ].prize.toLocaleString()}) - ${rankCount}개`,
      );
    });
  }

  static #getBonusOutput(isBonusNumber) {
    if (isBonusNumber) {
      return ', 보너스 볼 일치';
    }

    return '';
  }

  static printProfitRate(profitRate) {
    this.#print(`총 수익률은 ${profitRate}%입니다.`);
  }

  static printErrorMessage(error) {
    this.#print(error.message);
  }
}

export default OutputView;
