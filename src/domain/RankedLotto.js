const Lotto = require('./LottoMachine');
const { NUMBER } = require('../utils/constant');

class RankedLotto {
  constructor() {
    this.profit = 0;
    this.lotto = new Lotto();
  }
  ranking(winningNumber, bonusNumber) {
    const ranks = this.lotto.compareNumber(winningNumber, bonusNumber);
    return ranks;
  }

  setNumber(a) {
    this.lotto.setLottoNumber(a);
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
    const ConstantMoney = [
      NUMBER.FIFTH_PRIZE_MONEY,
      NUMBER.FOURTH_PRIZE_MONEY,
      NUMBER.THIRD_PRIZE_MONEY,
      NUMBER.SECOND_PRIZE_MONEY,
      NUMBER.FIRST_PRIZE_MONEY,
    ];
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
