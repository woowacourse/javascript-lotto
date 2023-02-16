const { RANK_INFORMATIONS, MAGIC_NUMBER } = require('../../constant');

class Benefit {
  #rate;

  getRate() {
    return this.#rate;
  }

  calculateRate(money, ranks) {
    const total = ranks.reduce(
      (accumulator, rank, index) =>
        accumulator + rank * RANK_INFORMATIONS[index].reward,
      0
    );

    this.#rate = (total / money) * MAGIC_NUMBER.percent;
  }
}

module.exports = Benefit;
