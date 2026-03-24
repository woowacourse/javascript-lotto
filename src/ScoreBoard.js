import { RANK } from "./constants.js";

const ScoreBoard = {
  getRank(matchCount, hasBonus) {
    if (matchCount === RANK.FIRST.MATCH_COUNT) {
      return RANK.FIRST.DISPLAY;
    }
    if (matchCount === RANK.SECOND.MATCH_COUNT && hasBonus) {
      return RANK.SECOND.DISPLAY;
    }
    if (matchCount === RANK.THIRD.MATCH_COUNT) {
      return RANK.THIRD.DISPLAY;
    }
    if (matchCount === RANK.FOURTH.MATCH_COUNT) {
      return RANK.FOURTH.DISPLAY;
    }
    if (matchCount === RANK.FIFTH.MATCH_COUNT) {
      return RANK.FIFTH.DISPLAY;
    }
    return RANK.NONE.DISPLAY;
  },

  makeAllRankCount(lottos, winningLotto) {
    const allRankCount = {
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
      NONE: 0,
    };

    lottos.forEach((lotto) => {
      const matchCount = winningLotto.getMatchCount(lotto);
      const hasBonus = winningLotto.hasBonus(lotto);
      allRankCount[ScoreBoard.getRank(matchCount, hasBonus)]++;
    });

    return allRankCount;
  },

  getProfitRate(allRankCount, money) {
    const totalProfit =
      allRankCount[RANK.FIRST.DISPLAY] * RANK.FIRST.PRICE +
      allRankCount[RANK.SECOND.DISPLAY] * RANK.SECOND.PRICE +
      allRankCount[RANK.THIRD.DISPLAY] * RANK.THIRD.PRICE +
      allRankCount[RANK.FOURTH.DISPLAY] * RANK.FOURTH.PRICE +
      allRankCount[RANK.FIFTH.DISPLAY] * RANK.FIFTH.PRICE;

    return ((totalProfit / money) * 100).toFixed(1);
  },
};

export default ScoreBoard;
