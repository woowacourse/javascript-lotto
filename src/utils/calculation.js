const { NUMBER, PRIZE } = require("../constants");

const Calculation = {
  //rank = [0,0,0,0,0]

  getPrize(rank) {
    let prize = 0;
    rank.forEach((_, index) => {
      prize += PRIZE[index] * rank[index];
    });
    return prize;
  },

  getProfit(rank, amount) {
    const prize = this.getPrize(rank);
    return ((prize / (amount * NUMBER.UNIT)) * 100).toFixed(1);
  },
};

module.exports = Calculation;
