import Lotto from '../Lotto/Lotto.js';

class LottoBuyer {
  static LOTTO_PRICE_PER_UNIT = 1000;

  static from() {
    return new LottoBuyer();
  }

  purchase(buyLottoPrice) {
    const lottoCount = buyLottoPrice / LottoBuyer.LOTTO_PRICE_PER_UNIT;

    return Array.from({ length: lottoCount }, () => Lotto.from().createNumber());
  }
}

export default LottoBuyer;
