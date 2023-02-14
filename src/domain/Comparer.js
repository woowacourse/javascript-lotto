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
}

module.exports = Comparer;
