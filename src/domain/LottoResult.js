import { WINNING_RANK } from "../constants/lotto-constants";
import { PERCENTATION, PRIZE } from "../constants/system";

class LottoResult {
  #lottoList;
  #winningLotto;
  #initializeResultObject = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  constructor(lottoList, WinningLotto) {
    this.#lottoList = lottoList;
    this.#winningLotto = WinningLotto;
  }

  getTotalResult() {
    const initialResult = { ...this.#initializeResultObject };

    return this.#lottoList.reduce((acc, lotto) => {
      const rank = lotto.getRank(this.#winningLotto);
      if (rank !== WINNING_RANK.NONE) {
        acc[rank] = (acc[rank] || 0) + 1;
      }
      return acc;
    }, initialResult);
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
