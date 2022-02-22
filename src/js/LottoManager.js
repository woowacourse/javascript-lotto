import Lotto from './Lotto.js';

export default class LottoManager {
  static getNumberOfLotto(amount) {
    return parseInt(amount / 1000, 10);
  }

  static issueLotto() {
    return new Lotto();
  }

  issueLottoWithCount(count) {
    return Array(count)
      .fill()
      .map(() => LottoManager.issueLotto());
  }
}
