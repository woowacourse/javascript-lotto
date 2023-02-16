import Lotto from './Lotto';

class RankedLotto {
  constructor(winningNumber, bonusNumber) {
    this.winningNumber = winningNumber;
    this.bonusNumber = bonusNumber;
    this.result = [0, 0, 0, 0, 0];
    this.profit = 0;
  }
  statisticalChart() {
    const lottoMoney = '1000';
    const lottoNumber = [
      [8, 21, 23, 41, 42, 43],
      [3, 5, 11, 16, 32, 38],
      [7, 11, 16, 35, 36, 44],
      [1, 8, 11, 31, 41, 42],
      [13, 14, 16, 38, 42, 45],
      [7, 11, 30, 40, 42, 43],
      [2, 13, 22, 32, 38, 45],
      [1, 3, 5, 14, 22, 45],
    ];
    const lotto = new Lotto(lottoMoney, lottoNumber);

    const ranks = lotto.compareNumber(this.winningNumber, this.bonusNumber);
    ranks
      .sort((a, b) => b - a)
      .forEach(number => {
        switch (number) {
          case 7:
            this.result[3]++;
            break;
          case 6:
            this.result[4]++;
            break;
          case 5:
            this.result[2]++;
            break;
          case 4:
            this.result[1]++;
            break;
          case 3:
            this.result[0]++;
            break;
        }
      });
  }

  earningsRate(lottoMoney) {
    const ConstantMoney = [5000, 50000,1500000, 30000000 ,2000000000];
    Array.from({ length: this.result.length }, (v, index) => {
      this.profit += this.result[index] * ConstantMoney[index];
    });
    this.profit = (this.profit / lottoMoney) * 100;
  }
}
export default RankedLotto;
