const { NUMBER } = require('../utils/constant.js');

class RankedLotto {
  constructor() {
    this.profit = 0;
  }

  getResult(ranks) {
    const result = [0, 0, 0, 0, 0];
    ranks
      .sort((a, b) => b - a)
      .forEach(number => {
        result[this.getRank(number)]++;
      });
    return result;
  }

  getRank(number) {
    if (number === NUMBER.RANK_SECOND) return 1;
    if (number === NUMBER.RANK_FIRST) return 0;
    if (number === NUMBER.RANK_THIRD) return 2;
    if (number === NUMBER.RANK_FOURTH) return 3;
    if (number === NUMBER.RANK_FIFTH) return 4;
  }

  earningsRate(lottoMoney, result) {
    const ConstantMoney = [
      NUMBER.FIFTH_PRIZE_MONEY, NUMBER.FOUR_PRIZE_MONEY,NUMBER.THIRD_PRIZE_MONEY,
      NUMBER.SECOND_PRIZE_MONEY,NUMBER.FIRST_PRIZE_MONEY,
    ];
    Array.from({ length: result.length }, (v, index) => {
      this.profit += result[index] * ConstantMoney[index];
    });
    this.profit = (this.profit / lottoMoney) * NUMBER.PERCENT;
  }

  get getProfit() {
    return this.profit;
  }
}
module.exports = RankedLotto;
