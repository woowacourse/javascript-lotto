import Model from '../core/Model.js';
import { LOTTO } from '../configs/contants.js';
import Lotto from './Lotto/Lotto.js';

export default class LottoModel extends Model {
  static issueLotto() {
    return new Lotto();
  }

  static getLottoCount(amount) {
    return parseInt(amount / LOTTO.PRICE, 10);
  }

  setInitState() {
    return {
      lottoList: [],
    };
  }

  purchase(amount, callback) {
    this.issueLottoWithCount(LottoModel.getLottoCount(amount));

    callback(this.getState());
  }

  issueLottoWithCount(count) {
    this.update({
      lottoList: Array(count)
        .fill()
        .map(() => LottoModel.issueLotto()),
    });
  }
}
