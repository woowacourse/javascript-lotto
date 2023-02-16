import Lotto from './Lotto.js';

class RankedLotto {
  constructor() {
    this.profit = 0;
    this.lotto = new Lotto();
  }
  ranking(winningNumber, bonusNumber) {
    const ranks = this.lotto.compareNumber(winningNumber, bonusNumber);
    return ranks
  }

  setNumber(a){
    this.lotto.setLottoNumber(a)
  }

  getResult(ranks) {
    const result = [0, 0, 0, 0, 0];
    ranks
      .sort((a, b) => b - a)
      .forEach(number => {
        switch (number) {
          case 7:
            result[3]++;
            break;
          case 6:
            result[4]++;
            break;
          case 5:
            result[2]++;
            break;
          case 4:
            result[1]++;
            break;
          case 3:
            result[0]++;
            break;
        }
      });
    return result;
  }

  earningsRate(lottoMoney, result) {
    const ConstantMoney = [5000, 50000, 1500000, 30000000, 2000000000];
    Array.from({ length:result.length }, (v, index) => {
      this.profit += result[index] * ConstantMoney[index];
    });
    this.profit = (this.profit / lottoMoney) * 100;
  }

  get getProfit(){
    return this.profit
  }

}
export default RankedLotto;
