import Model from '../core/Model.js';
import Lotto from './Lotto/Lotto.js';
import { LOTTO } from '../configs/contants.js';

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
}
