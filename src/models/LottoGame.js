import { LOTTO } from "../constants/lotto.js";
import { PRIZE } from "../constants/prize.js";
import Lotto from "./Lotto.js";

class LottoGame {
  generateLottos(price) {
    const count = price / LOTTO.PRICE_STEP;
    return Array.from(
      { length: count },
      () =>
        new Lotto(
          this.generateLottoNumbers(
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
    switch (matchCount) {
      case 6:
        return PRIZE.FIRST;
      case 5:
        return isBonusMatched ? PRIZE.SECOND : PRIZE.THIRD;
      case 4:
        return PRIZE.FOURTH;
      case 3:
        return PRIZE.FIFTH;
      default:
        return;
    }
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

  generateLottoNumbers(min, max, count) {
    const numbers = new Set();

    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }

    return [...numbers].sort((a, b) => a - b);
  }
}
export default LottoGame;
