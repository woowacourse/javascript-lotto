import Lotto from '../Lotto/Lotto.js';

class LottoBuyer {
  static LOTTO_PRICE_PER_UNIT = 1000;

  static BUY_LOTTO_PRICE_RANGE = Object.freeze({
    min: 1000,
    max: 10000,
  });

  #budget;

  constructor(buyLottoPrice) {
    this.#budget = buyLottoPrice;
  }

  purchase() {
    const lottoCount = this.#budget / LottoBuyer.LOTTO_PRICE_PER_UNIT;

    return Array.from({ length: lottoCount }, () => Lotto.from().createNumber());
  }
}

export default LottoBuyer;
