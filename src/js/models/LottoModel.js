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
      const countString = this.transToString(count);
      this.winningStatistic[countString] += 1;
    });
  }

  transToString(count) {
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
}
