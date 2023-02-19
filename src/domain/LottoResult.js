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
        switch (number) {
          case NUMBER.RANK_SECOND:
            result[3]++;
            break;
          case NUMBER.RANK_FIRST:
            result[4]++;
            break;
          case NUMBER.RANK_THIRD:
            result[2]++;
            break;
          case NUMBER.RANK_FOURTH:
            result[1]++;
            break;
          case NUMBER.RANK_FIFTH:
            result[0]++;
            break;
        }
      });
    return result;
  }

  earningsRate(lottoMoney, result) {
    const ConstantMoney = [5000, 50000, 1500000, 30000000, 2000000000];
    Array.from({ length: result.length }, (v, index) => {
      this.profit += result[index] * ConstantMoney[index];
    });
    this.profit = (this.profit / lottoMoney) * 100;
  }

  get getProfit() {
    return this.profit;
  }
}
module.exports = RankedLotto;
