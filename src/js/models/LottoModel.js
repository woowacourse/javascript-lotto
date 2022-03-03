import { LOTTO } from '../configs/contants.js';
import Lotto from './Lotto/Lotto.js';

export default class LottoModel {
  state;

  constructor() {
    this.initialState();
  }

  initialState() {
    this.state = {
      amount: 0,
      lottoList: [],
      winningStatistic: {
        under: 0,
        three: 0,
        four: 0,
        five: 0,
        fiveBonus: 0,
        six: 0,
      },
    };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }

  getState() {
    return this.state;
  }

  issueLotto() {
    return new Lotto();
  }

  getCountOfLotto() {
    return parseInt(this.state.amount / LOTTO.PRICE, 10);
  }

  getEarningRate() {
    const winnings = this.getSumWinnings();

    return (winnings / this.state.amount) * 100;
  }

  createLottoListWithAmount() {
    const count = this.getCountOfLotto();
    this.state.lottoList = this.issueLottosWithCount(count);
  }

  issueLottosWithCount(count) {
    return Array(count)
      .fill()
      .map(() => this.issueLotto());
  }

  setWinningStatistic(coincideCountList) {
    coincideCountList.forEach((count) => {
      const countString = this.translateToString(count);
      this.state.winningStatistic[countString] += 1;
    });
  }

  getSumWinnings() {
    const statisticList = Object.entries(this.state.winningStatistic);
    const initialValue = 0;

    return statisticList.reduce((prev, curr) => {
      const numberString = curr[0];
      const count = curr[1];

      return prev + this.translateToWinnings(numberString) * count;
    }, initialValue);
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

  translateToWinnings(numberString) {
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
}
