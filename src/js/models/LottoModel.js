import { LOTTO } from '../configs/contants.js';
import Lotto from './Lotto/Lotto.js';

export default class LottoModel {
  static issueLotto() {
    return new Lotto();
  }

  static getCountOfLotto(amount) {
    return parseInt(amount / LOTTO.PRICE, 10);
  }

  init() {
    this.lottoList = [];
    this.winningStatistic = {
      under: 0,
      three: 0,
      four: 0,
      five: 0,
      fiveBonus: 0,
      six: 0,
    };
  }

  getLottoList() {
    return this.lottoList;
  }

  createLottoListWithAmount(amount) {
    const count = LottoModel.getCountOfLotto(amount);
    this.lottoList = this.issueLottosWithCount(count);
  }

  issueLottosWithCount(count) {
    return Array(count)
      .fill()
      .map(() => LottoModel.issueLotto());
  }

  setWinningStatistic(coincideCountList) {
    coincideCountList.forEach((count) => {
      const countString = this.translateToString(count);
      this.winningStatistic[countString] += 1;
    });
  }

  translateToString(count) {
    switch (count) {
      case 3:
        return 'three';
      case 4:
        return 'four';
      case 5:
        return 'five';
      case 5.5:
        return 'fiveBonus';
      case 6:
        return 'six';
      default:
        return 'under';
    }
  }

  getSumWinnings() {
    const statisticList = Object.entries(this.winningStatistic);
    const initialValue = 0;

    return statisticList.reduce((prev, curr) => {
      const numberString = curr[0];
      const count = curr[1];

      return prev + this.getWinnings(numberString) * count;
    }, initialValue);
  }

  getWinnings(numberString) {
    switch (numberString) {
      case 'three':
        return 5000;
      case 'four':
        return 50000;
      case 'five':
        return 1500000;
      case 'fiveBonus':
        return 30000000;
      case 'six':
        return 2000000000;
      default:
        return 0;
    }
  }

  getEarningRate(winnings, amount) {
    return (winnings / amount) * 100;
  }
}
