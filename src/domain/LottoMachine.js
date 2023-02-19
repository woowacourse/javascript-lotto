const Lotto = require('./Lotto');

const { shuffle } = require('../utils/shuffle');

const { ALL_LOTTO_NUMBERS } = require('./constants/index');

class LottoMachine {
  #purchasePrice;

  #lottos = [];

  purchase(purchasePrice) {
    this.#purchasePrice = purchasePrice;

    this.validatePurchasePrice();
    this.issueLottos();
  }

  validatePurchasePrice() {
    if (!this.isValidPurchasePrice()) {
      throw Error('[ERROR] 구입 금액은 1000으로 나누어 떨어져야 합니다.');
    }
  }

  isValidPurchasePrice() {
    this.#purchasePrice = Number(this.#purchasePrice);

    return this.#purchasePrice >= 1000 && this.#purchasePrice % 1000 === 0;
  }

  issueLottos() {
    const lottoCount = this.#purchasePrice / 1000;

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

  get lottosCount() {
    return this.#purchasePrice / 1000;
  }
}

module.exports = LottoMachine;
