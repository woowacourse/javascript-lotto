const Lotto = require('./Lotto');

const { shuffle } = require('../utils/shuffle');

const { ALL_LOTTO_NUMBERS } = require('./constants/index');

class LottoMachine {
  #lottos = [];

  constructor(purchasePrice) {
    this.validatePurchasePrice(purchasePrice);
    this.issueLottos(purchasePrice);
  }

  validatePurchasePrice(purchasePrice) {
    if (!this.isValidPurchasePrice(purchasePrice)) {
      throw Error('[ERROR] 구입 금액은 1000으로 나누어 떨어져야 합니다.');
    }
  }

  isValidPurchasePrice(purchasePrice) {
    return purchasePrice >= 1000 && purchasePrice % 1000 === 0;
  }

  issueLottos(purchasePrice) {
    const lottoCount = purchasePrice / 1000;
    Array(lottoCount)
      .fill(0)
      .forEach(() => {
        this.#lottos.push(this.issueLotto());
      });
  }

  issueLotto() {
    return new Lotto(
      shuffle(ALL_LOTTO_NUMBERS)
        .slice(0, 6)
        .sort((x, y) => x - y)
    );
  }

  get lottos() {
    return this.#lottos;
  }
}

module.exports = LottoMachine;
