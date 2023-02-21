const Lotto = require('./Lotto');

const { shuffle } = require('../utils/shuffle');

const {
  ALL_LOTTO_NUMBERS,
  LOTTO_UNIT_PRICE,
  LOTTO_NUMBERS_COUNT,
} = require('./constants/index');

class LottoMachine {
  #lottos = [];

  constructor(purchasePrice) {
    this.validatePurchasePrice(purchasePrice);
    this.#lottos = this.issueLottos(purchasePrice);
  }

  validatePurchasePrice(purchasePrice) {
    if (!this.isValidPurchasePrice(purchasePrice)) {
      throw Error(
        `[ERROR] 구입 금액은 ${LOTTO_UNIT_PRICE}으로 나누어 떨어져야 합니다.`
      );
    }
  }

  isValidPurchasePrice(purchasePrice) {
    return (
      purchasePrice >= LOTTO_UNIT_PRICE &&
      purchasePrice % LOTTO_UNIT_PRICE === 0
    );
  }

  issueLottos(purchasePrice) {
    const lottoCount = purchasePrice / LOTTO_UNIT_PRICE;

    return new Array(lottoCount).fill().map(() => this.issueLotto());
  }

  issueLotto() {
    return new Lotto(
      shuffle(ALL_LOTTO_NUMBERS)
        .slice(0, LOTTO_NUMBERS_COUNT)
        .sort((x, y) => x - y)
    );
  }

  get lottos() {
    return this.#lottos;
  }
}

module.exports = LottoMachine;
