import { PRIZE_PER_RANK } from "./constants";
import Lotto from "./Lotto";

class PurchasedLotto {
  #lottos;

  constructor(lottoNumbersList) {
    if (
      !Array.isArray(lottoNumbersList) ||
      lottoNumbersList.some((arr) => !Array.isArray(arr))
    )
      throw new Error("[ERROR]");

    this.#lottos = lottoNumbersList.map(
      (lottoNumbers) => new Lotto(lottoNumbers)
    );
  }

  getLottoCount() {
    return this.#lottos.length;
  }

  getPrizeList(winningLotto) {
    const prizeList = [0, 0, 0, 0, 0, 0];
    this.#lottos.forEach((lotto) => {
      const rank = winningLotto.getRank(lotto);
      if (rank !== null && rank >= 1 && rank <= 5) prizeList[rank] += 1;
    });

    return prizeList;
  }

  calculateReturnRate(winningLotto, purchaseAmount) {
    const prizeList = this.getPrizeList(winningLotto);
    const totalPrize = prizeList.reduce((acc, count, rank) => {
      const prizeMoney = PRIZE_PER_RANK[rank] || 0;
      return acc + count * prizeMoney;
    }, 0);

    return Math.round((totalPrize / purchaseAmount) * 100 * 10) / 10;
  }
}

export default PurchasedLotto;
