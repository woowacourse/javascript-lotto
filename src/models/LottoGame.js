import { PRIZE } from "../constants/prize.js";

class LottoGame {
  playLotto(lottos, result) {
    const { winningNumbers, bonusNumber } = result;

    const gameResults = lottos
      .map((lotto) => {
        const { matchCount, isBonusMatched } = lotto.getMatchResult(
          winningNumbers,
          bonusNumber
        );
        return this.checkRank(matchCount, isBonusMatched);
      })
      .filter(Boolean);

    return {
      totalReward: this.calcTotalReward(gameResults),
      rankCount: this.getRankCount(gameResults),
    };
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
    return gameResults.reduce(
      (resultCount, result) =>
        resultCount.map((count, index) =>
          index === result.RANK ? count + 1 : count
        ),
      new Array(6).fill(0)
    );
  }
}
export default LottoGame;
