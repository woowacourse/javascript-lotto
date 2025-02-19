//@ts-check

import { LOTTO_RANK, NO_WINNING } from "../lib/constants.js";
import { getIntersectCount } from "../lib/utils.js";

class LottoCompany {
  #winNumbers;
  #bonusNumber;
  constructor(winNumbers, bonusNumber) {
    this.#winNumbers = winNumbers;
    this.#bonusNumber = bonusNumber;
  }

  calculateLottoRanks(purchasedLottos) {
    return purchasedLottos.map((lotto) => {
      const winningLottoCount = getIntersectCount(
        lotto.numbers,
        this.#winNumbers
      );
      const isBonusNumber = lotto.numbers.includes(this.#bonusNumber);

      const rank = this.#getRank(winningLottoCount, isBonusNumber);
      return rank;
    });
  }

  #getRank(winningLottoCount, isBonusNumber) {
    const rank = Object.keys(LOTTO_RANK).find((rank) => {
      const info = LOTTO_RANK[rank];

      if (info.winNumber === winningLottoCount) {
        if (!info.isBonusNumber || isBonusNumber) return true;
      }
      return false;
    });
    if (rank === undefined) {
      return NO_WINNING;
    }
    return rank;
  }

  static calculateTotalProfit(lottoRanks) {
    return lottoRanks.reduce(
      (prev, cur) => (cur === NO_WINNING ? prev : prev + LOTTO_RANK[cur].prize),
      0
    );
  }
}

export default LottoCompany;
