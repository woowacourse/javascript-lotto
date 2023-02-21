import { RANK } from '../constant/setting';

class Comparer {
  static #INIT_RANKING = {
    [RANK.FIFTH.name]: 0,
    [RANK.FOURTH.name]: 0,
    [RANK.THIRD.name]: 0,
    [RANK.SECOND.name]: 0,
    [RANK.FIRST.name]: 0,
  };

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

  getStatistics() {
    const matchCount = this.countMatchesOfWinningNumber();
    const bonus = this.checkIncludesBonus();
    return matchCount.reduce(
      (acc, cur, index) => {
        const rank = this.getRank(cur, bonus[index]);
        if (rank) acc[rank] += 1;
        return acc;
      },
      { ...Comparer.#INIT_RANKING },
    );
  }

  getRank(matchCount, hasBonus) {
    if (matchCount === RANK.SECOND.matchCount && hasBonus) return RANK.SECOND.name;
    return (
      {
        [RANK.FIFTH.matchCount]: RANK.FIFTH.name,
        [RANK.FOURTH.matchCount]: RANK.FOURTH.name,
        [RANK.THIRD.matchCount]: RANK.THIRD.name,
        [RANK.FIRST.matchCount]: RANK.FIRST.name,
      }[matchCount] ?? undefined
    );
  }
}

export default Comparer;
