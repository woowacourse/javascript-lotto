import Lotto from './Lotto.js';

export default class LottoModel {
  lottoList;

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

  purchase(count) {
    this.issueLottoWithCount(count);

    return this.lottoList;
  }
}
