const { RANK } = require('../constant/setting');

class Comparer {
  constructor(winningNumber, bonus, lottos) {
    this.winningNumber = winningNumber;
    this.bonus = bonus;
    this.lottos = lottos;
  }

  countMatchesOfWinningNumber() {
    return this.lottos.map((lotto) => {
      const numbers = new Set([...this.winningNumber, ...lotto]);
      return 12 - numbers.size;
    });
  }

  checkIncludesBonus() {
    return this.lottos.map((lotto) => lotto.includes(this.bonus));
  }

  getRanking() {
    const matchCount = this.countMatchesOfWinningNumber();
    const bonus = this.checkIncludesBonus();
    return matchCount.reduce(
      (acc, cur, index) => {
        const rank = this.getRank(cur, bonus[index]);
        if (rank) acc[rank] += 1;
        return acc;
      },
      {
        [RANK.FIFTH.name]: 0,
        [RANK.FOURTH.name]: 0,
        [RANK.THIRD.name]: 0,
        [RANK.SECOND.name]: 0,
        [RANK.FIRST.name]: 0,
      },
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

module.exports = Comparer;
