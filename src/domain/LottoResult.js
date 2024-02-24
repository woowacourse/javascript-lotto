import {
  NO_MATCH_PLACE,
  PERCENTATION,
  PRIZE,
} from "../constants/prize-constants";

class LottoResult {
  #lottoList;

  #winningLotto;

  constructor(lottoList, WinningLotto) {
    this.#lottoList = lottoList;
    this.#winningLotto = WinningLotto;
  }

  getTotalResult() {
    const initialResult = this.#initializeResultObject();

    const totalResult = this.#lottoList.reduce((acc, lotto) => {
      const rank = lotto.getRank(this.#winningLotto);
      if (rank !== NO_MATCH_PLACE) {
        initialResult[rank] += 1;
      }

      return acc;
    }, initialResult);

    return totalResult;
  }

  #initializeResultObject() {
    const initialResult = Object.keys(PRIZE).reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, {});

    initialResult["NONE_PLACE"] = 0;

    return initialResult;
  }

  #getTotalReward() {
    const totalResult = this.getTotalResult();
    const totalReward = Object.keys(totalResult).reduce((acc, cur) => {
      const prizeReward = PRIZE[cur] ? PRIZE[cur].reward * totalResult[cur] : 0;
      return acc + prizeReward;
    }, 0);
    return totalReward;
  }

  getProfit(purchaseAmount) {
    const totalReward = this.#getTotalReward();
    return (totalReward / purchaseAmount) * PERCENTATION;
  }
}

export default LottoResult;
