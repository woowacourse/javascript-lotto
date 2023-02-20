const { RANK_INFORMATIONS, CALCULATION_NUMBER } = require('../../constant');

class Benefit {
  #rate;

  getRate() {
    return this.#rate;
  }

  calculateRate(money, ranks) {
    const total = ranks.reduce(
      (accumulator, rank, rankIndex) =>
        accumulator + rank * RANK_INFORMATIONS[rankIndex].reward,
      0
    );

    this.#rate = Number(
      ((total / money) * CALCULATION_NUMBER.percent).toFixed(1)
    );
  }
}

module.exports = Benefit;
