class LottoGame {
  #lottos = [];

  validatePurchasePrice(purchasePrice) {
    if (!this.isValidPurchasePrice(purchasePrice)) {
      throw Error('[ERROR] 구입 금액은 1000으로 나누어 떨어져야 합니다.');
    }
  }

  isValidPurchasePrice(purchasePrice) {
    return purchasePrice % 1000 === 0;
  }

  issueLottos(purchasePrice) {
    const lottoCount = purchasePrice / 1000;

    Array(lottoCount)
      .fill(0)
      .forEach(() => {
        this.#lottos.push([1, 2, 3, 4, 5, 6]);
      });
  }

  get lottos() {
    return this.#lottos;
  }
}

module.exports = LottoGame;
