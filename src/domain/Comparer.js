const { RANK, INIT_RANKING, RANK_MATCH } = require('../constant/setting');

class Comparer {
  #winningLotto;

  #lottos;

  constructor(winningLotto, lottos) {
    this.#winningLotto = winningLotto;
    this.#lottos = lottos;
  }

  getRanking() {
    return this.#lottos.reduce(
      (acc, lotto) => {
        const rank = this.#getRank(lotto);

        if (rank) {
          acc[rank] += 1;
        }

        return acc;
      },
      { ...INIT_RANKING },
    );
  }

  #getRank(lotto) {
    if (this.#isSecondRank(lotto)) {
      return RANK.SECOND.NAME;
    }

    return RANK_MATCH[this.#winningLotto.matchCount(lotto)];
  }

  #isSecondRank(lotto) {
    return (
      this.#winningLotto.matchCount(lotto) === RANK.SECOND.MATCH_COUNT &&
      this.#winningLotto.hasBonusNumber(lotto)
    );
  }
}

module.exports = Comparer;
