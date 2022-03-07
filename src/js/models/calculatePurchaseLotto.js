import { LOTTO } from '../utils/constants.js';
import ResultLottoDatas from './resultLottoDatas.js';

export default class CalculatePurchaseLotto {

  static setLottoGameList(purchaseMoney) {
    const lottoCount = purchaseMoney / LOTTO.COST_UNIT;
    const lottoList = Array.from({ length: lottoCount }, () => this.setOneLottoGame());
    ResultLottoDatas.setLottoList(lottoList);
  }

  static setOneLottoGame() {
    const lottoNumberList = new Set();
    while (lottoNumberList.size < LOTTO.NUMBER_LENGTH) {
      lottoNumberList.add(this.setLottoNumber());
    }

    return lottoNumberList;
  }

  static setLottoNumber() {
    return Math.floor(Math.random() * (LOTTO.MAX_DIGIT - LOTTO.MIN_DIGIT + 1)) + LOTTO.MIN_DIGIT;
  }

}