import { RANKING } from '../constants/constants.js';
class LottoResult {
  #result;

  constructor(rankingList) {
    this.#result = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    rankingList.forEach((ranking) => {
      this.#validate(ranking);
      this.#addRankingCount(ranking);
    });

    Object.freeze(this.#result);
  }

  #validate(ranking) {
    const isValidRanking = Object.values(RANKING).some((rank) => rank.RANK === ranking);

    if (!isValidRanking && ranking !== null) {
      throw new Error(RANKING_ERROR_MESSAGES);
    }
  }

  #addRankingCount(ranking) {
    if (ranking !== null) this.#result[ranking]++;
  }

  #findPrize(rank) {
    if (rank === null) {
      return 0;
    }
    const rankingKey = Object.keys(RANKING).find((key) => RANKING[key].RANK === Number(rank));
    return RANKING[rankingKey].PRIZE;
  }

  get result() {
    return this.#result;
  }

  get totalPrize() {
    return Object.entries(this.#result).reduce((total, [rank, count]) => {
      return total + this.#findPrize(rank) * count;
    }, 0);
  }
}

export default LottoResult;
