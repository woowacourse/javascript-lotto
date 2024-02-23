import Lotto from '../Lotto/Lotto.js';

/**
 * @module LottoBuyer
 * 로또 구매 금액 만큼의 로또를 구매하는 역할을 수행하는 도메인 모듈
 */
class LottoBuyer {
  static LOTTO_PRICE_PER_UNIT = 1000;

  static BUY_LOTTO_PRICE_RANGE = Object.freeze({
    min: 1000,
    max: 10000,
  });

  #budget;

  /**
   * @param {number} buyLottoPrice - 로또 구입 금액
   */
  constructor(buyLottoPrice) {
    this.#budget = buyLottoPrice;
  }

  /**
   * @returns {import('../../types/jsDoc.js').LottoNumber[]} 구매 금액 만큼의 로또 번호열
   */
  purchase() {
    const lottoCount = this.#budget / LottoBuyer.LOTTO_PRICE_PER_UNIT;

    return Array.from({ length: lottoCount }, () => new Lotto().createNumber());
  }
}

export default LottoBuyer;
