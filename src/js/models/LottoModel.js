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
}
