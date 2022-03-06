import { STATISTIC, LOTTO } from '../configs/contants.js';
import Lotto from './Lotto/Lotto.js';

export default class LottoModel {
  state;

  static createWinningStatistic() {
    const statisticList = Object.keys(STATISTIC).map((numberString) => {
      return [numberString, 0];
    });

    return Object.fromEntries(statisticList);
  }

  constructor() {
    this.setInitialState();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }

  setInitialState() {
    const initialState = {
      amount: 0,
      lottoList: [],
      winningStatistic: LottoModel.createWinningStatistic(),
    };

    this.setState(initialState);
  }

  setLottoListWithAmount(amount) {
    const count = this.getCountOfLotto(amount);
    const lottoList = this.issueLottosWithCount(count);

    this.setState({ amount, lottoList });
  }

  getState() {
    return this.state;
  }

  getEarningRatio() {
    const sumWinnings = this.getSumWinnings();

    return (sumWinnings / this.state.amount) * 100 - 100;
  }

  getSumWinnings() {
    const statisticList = Object.entries(this.state.winningStatistic);
    const initialValue = 0;

    return statisticList.reduce((prev, curr) => {
      const numberString = curr[0];
      const count = curr[1];

      return prev + STATISTIC[numberString].winnings * count;
    }, initialValue);
  }

  getCountOfLotto(amount) {
    return parseInt(amount / LOTTO.PRICE, 10);
  }

  issueLottosWithCount(count) {
    return Array(count)
      .fill()
      .map(() => this.issueLotto());
  }

  issueLotto() {
    return new Lotto();
  }
}
