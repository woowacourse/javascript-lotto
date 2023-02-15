const { MAGIC_NUMBER } = require('../../constant');

class Benefit {
  #rate;

  getRate() {
    return this.#rate;
  }

  calculateRate(money, ranks) {
    const rewards = Object.values(MAGIC_NUMBER.reward);

    const total = ranks.reduce(
      (accumulator, rank, index) => accumulator + rank * rewards[index],
      0
    );

    this.#rate = (total / money) * 100;
  }
}

module.exports = Benefit;
