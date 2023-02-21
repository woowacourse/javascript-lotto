const { RANK } = require('../constant/setting');

class ProfitCalculator {
  #ranking;

  constructor(ranking) {
    this.#ranking = ranking;
  }

  getWinningAmount() {
    return Object.entries(this.#ranking).reduce(
      (acc, [rank, count]) => acc + RANK[rank].rewards * count,
      0,
    );
  }

  getProfitRate(money) {
    return (this.getWinningAmount() * 100) / money;
  }
}

module.exports = ProfitCalculator;
