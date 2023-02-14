class ProfitCalculator {
  constructor(ranking) {
    this.ranking = ranking;
  }

  getWinningAmount() {
    return (
      this.ranking[1] * 2_000_000_000 +
      this.ranking[2] * 30_000_000 +
      this.ranking[3] * 1_500_000 +
      this.ranking[4] * 50_000 +
      this.ranking[5] * 5_000
    );
  }

  getProfitRate(money) {
    return (this.getWinningAmount() * 100) / money;
  }
}

module.exports = ProfitCalculator;
