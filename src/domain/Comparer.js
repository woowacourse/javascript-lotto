const { RANK, INIT_RANKING, RANK_MATCH } = require('../constant/setting');

class Comparer {
  #winningLotto;

  #lottos;

  constructor(winningLotto, lottos) {
    this.#winningLotto = winningLotto;
    this.#lottos = lottos;
  }

  countMatchesOfWinningNumber() {
    return this.#lottos.map((lotto) => this.#winningLotto.matchCount(lotto));
  }

  checkIncludesBonus() {
    return this.#lottos.map((lotto) => this.#winningLotto.hasBonusNumber(lotto));
  }

  getRanking() {
    const matchCount = this.countMatchesOfWinningNumber();
    const bonus = this.checkIncludesBonus();
    return matchCount.reduce(
      (acc, cur, index) => {
        const rank = this.getRank(cur, bonus[index]);

        if (rank) {
          acc[rank] += 1;
        }

        return acc;
      },
      { ...INIT_RANKING },
    );
  }

  getRank(matchCount, hasBonus) {
    if (matchCount === RANK.SECOND.MATCH_COUNT && hasBonus) {
      return RANK.SECOND.NAME;
    }

    return RANK_MATCH[matchCount];
  }
}

module.exports = Comparer;
