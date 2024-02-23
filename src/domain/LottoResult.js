import { PERCENTATION, WINNING_RANK } from "../constants/option.js";
import { PRIZE } from "../constants/system.js";

class LottoResult {
  #lottoList;
  #winningLotto;

  constructor(lottoList, WinningLotto) {
    this.#lottoList = lottoList;
    this.#winningLotto = WinningLotto;
  }

  #getResult() {
    const arr = [];
    this.#lottoList.forEach((lotto) => {
      const rank = lotto.getRank(this.#winningLotto);
      if (rank !== WINNING_RANK.NONE) arr.push(rank);
    });

    return arr;
  }

  getTotalResult() {
    const results = this.#getResult();
    return results.reduce(
      (acc, cur) => {
        acc[cur] += 1;
        return acc;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    );
  }

  #getTotalReward() {
    const totalResult = this.getTotalResult();
    return Object.keys(totalResult).reduce((acc, cur) => {
      const prizeReward = PRIZE[cur].reward * totalResult[cur];
      return acc + prizeReward;
    }, 0);
  }

  getProfit(purchaseAmount) {
    const totalReward = this.#getTotalReward();
    return (totalReward / purchaseAmount) * PERCENTATION;
  }
}

export default LottoResult;
