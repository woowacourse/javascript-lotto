import Lotto from './Lotto.js';

export default class LottoModel {
  static getNumberOfLotto(amount) {
    return parseInt(amount / 1000, 10);
  }

  static issueLotto() {
    return new Lotto();
  }

  constructor(initState = []) {
    this.lottoList = initState;
  }

  issueLottoWithCount(count) {
    this.lottoList = Array(count)
      .fill()
      .map(() => LottoModel.issueLotto());
  }

  purchase(amount) {
    this.issueLottoWithCount(LottoModel.getNumberOfLotto(amount));

    return this.lottoList;
  }
}
