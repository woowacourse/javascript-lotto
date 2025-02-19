//@ts-check

import { LOTTO_RANK } from "../lib/constants.js";
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

  static calculateTotalProfit(lottoRanks) {
    return lottoRanks.reduce((prev, cur) => {
      if (cur === "당첨 없음") return prev;
      else {
        return prev + LOTTO_RANK[cur].prize;
      }
    }, 0);
  }
}

export default LottoCompany;
