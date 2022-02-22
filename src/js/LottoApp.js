import Lotto from './Lotto.js';

export default class LottoApp {
  static getNumberOfLotto(amount) {
    return parseInt(amount / 1000, 10);
  }

  issueLotto() {
    return new Lotto();
  }
}
