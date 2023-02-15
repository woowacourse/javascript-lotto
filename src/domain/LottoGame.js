const LOTTO_PRICE = 1000;

class LottoGame {
  static calculateTheChange(money) {
    return money % LOTTO_PRICE;
  }
}

export default LottoGame;
