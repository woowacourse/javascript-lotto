class Comparer {
  constructor(winningNumber, lottos) {
    this.winningNumber = winningNumber;
    this.lottos = lottos;
  }

  countMatches() {
    return this.lottos.map((lotto) => {
      const numbers = new Set([...this.winningNumber, ...lotto]);
      return 12 - numbers.size;
    });
  }
}

module.exports = Comparer;
