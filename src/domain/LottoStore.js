class LottoStore {
  constructor() {}

  calculateLottoCount(purchaseAmount) {
    this.#validatePurchaseAmount(purchaseAmount);
    const lottoPrice = 1000;

    return purchaseAmount / lottoPrice;
  }

  generateRandomNumbers(lottoCount) {
    this.#validateLottoCount(lottoCount);

    // TODO: 정상동작 테스트
    return Array.from({ length: lottoCount }).map(() => [1, 2, 3, 4, 5, 6]);
  }

  #validatePurchaseAmount(purchaseAmount) {
    if (typeof purchaseAmount !== "number") {
      throw new Error();
    }

    if (purchaseAmount % 1000 !== 0) {
      throw new Error();
    }

    if (purchaseAmount < 1000 || purchaseAmount > 100000) {
      throw new Error();
    }
  }

  #validateLottoCount(lottoCount) {
    if (typeof lottoCount !== "number") {
      throw new Error();
    }

    if (!Number.isInteger(lottoCount)) {
      throw new Error();
    }

    if (lottoCount < 1 || lottoCount > 100) {
      throw new Error();
    }
  }
}

export default LottoStore;
