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
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    );
  }

  getRank(matchCount, hasBonus) {
    if (matchCount === 5 && hasBonus) return 2;
    return (
      {
        3: 5,
        4: 4,
        5: 3,
        6: 1,
      }[matchCount] ?? undefined
    );
  }
}

module.exports = Comparer;
