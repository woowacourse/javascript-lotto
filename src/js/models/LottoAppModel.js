import Model from '../core/Model.js';
import { LOTTO } from '../configs/contants.js';
import Lotto from './Lotto/Lotto.js';

export default class LottoAppModel extends Model {
  static issueLotto() {
    return new Lotto();
  }

  static getNumberOfLotto(amount) {
    return parseInt(amount / LOTTO.PRICE, 10);
  }

  purchase(amount, callback) {
    this.issueLottoWithCount(LottoAppModel.getNumberOfLotto(amount));

    callback(this.getState());
  }

  issueLottoWithCount(count) {
    this.update({
      lottoList: Array(count)
        .fill()
        .map(() => LottoAppModel.issueLotto()),
    });
  }
}
