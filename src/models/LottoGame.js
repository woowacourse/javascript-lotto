import { LOTTO } from "../constants/lotto.js";
import { PRIZE, RANK_MAP } from "../constants/prize.js";
import generateRandomNumbers from "../utils/generateRandomNumbers.js";
import Lotto from "./Lotto.js";

class LottoGame {
  generateLottos(price) {
    const count = price / LOTTO.PRICE_STEP;
    return Array.from(
      { length: count },
      () =>
        new Lotto(
          generateRandomNumbers(
            LOTTO.MIN_LOTTO_NUMBER,
            LOTTO.MAX_LOTTO_NUMBER,
            LOTTO.LOTTO_NUMBER_COUNT
          )
        )
    );
  }

  playLotto(lottos, result) {
    const { winningNumbers, bonusNumber } = result;

    return lottos
      .map((lotto) => {
        const { matchCount, isBonusMatched } = lotto.getMatchResult(
          winningNumbers,
          bonusNumber
        );
        return this.checkRank(matchCount, isBonusMatched);
      })
      .filter(Boolean);
  }

  checkRank(matchCount, isBonusMatched) {
    const rank = RANK_MAP[matchCount];
    return typeof rank === "function" ? rank(isBonusMatched) : rank;
  }

  calcTotalReward(gameResults) {
    return gameResults.reduce(
      (totalReward, result) => totalReward + result.REWARD,
      0
    );
  }

  getRankCount(gameResults) {
    const rankCount = gameResults.reduce(
      (resultCount, result) =>
        resultCount.map((count, index) =>
          index === result.RANK ? count + 1 : count
        ),
      new Array(6).fill(0)
    );

    return Object.fromEntries(
      Object.entries(PRIZE).map(([key], index) => [
        key,
        rankCount[index + 1] || 0,
      ])
    );
  }
}
export default LottoGame;
