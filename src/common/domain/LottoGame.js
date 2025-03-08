import { RANKING } from '../constants/constants.js';

class LottoGame {
  #rank;

  constructor() {
    this.#rank = {
      [RANKING.FIRST.RANK]: 0,
      [RANKING.SECOND.RANK]: 0,
      [RANKING.THIRD.RANK]: 0,
      [RANKING.FOURTH.RANK]: 0,
      [RANKING.FIFTH.RANK]: 0,
    };
  }

  addRankingCount(ranking) {
    this.#rank[ranking] += 1;
  }

  static calculateRank(matchCount, isBonusMatch) {
    if (matchCount === RANKING.FIRST.MATCH_COUNT) return RANKING.FIRST.RANK;
    if (matchCount === RANKING.SECOND.MATCH_COUNT && isBonusMatch) return RANKING.SECOND.RANK;
    if (matchCount === RANKING.THIRD.MATCH_COUNT) return RANKING.THIRD.RANK;
    if (matchCount === RANKING.FOURTH.MATCH_COUNT) return RANKING.FOURTH.RANK;
    if (matchCount === RANKING.FIFTH.MATCH_COUNT) return RANKING.FIFTH.RANK;
    return 0;
  }

  static calculateTotalPrize(rank) {
    return (
      rank[RANKING.FIRST.RANK] * RANKING.FIRST.PRIZE +
      rank[RANKING.SECOND.RANK] * RANKING.SECOND.PRIZE +
      rank[RANKING.THIRD.RANK] * RANKING.THIRD.PRIZE +
      rank[RANKING.FOURTH.RANK] * RANKING.FOURTH.PRIZE +
      rank[RANKING.FIFTH.RANK] * RANKING.FIFTH.PRIZE
    );
  }

  static calculateWinningRate(price, prize) {
    const rate = (prize / price) * 100;

    if (rate % 1 === 0) return Number(rate.toString());
    return Number(rate.toFixed(2));
  }

  get rank() {
    return this.#rank;
  }
}

export default LottoGame;
