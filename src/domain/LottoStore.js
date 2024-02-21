import Lotto from "./Lotto";

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

  issueLottos(sixNumbersArray) {
    // 2차원 배열의 이름 리뷰어는 어떻게 생각하시나요 ??
    this.#validateSixNumbersArray(sixNumbersArray);

    return sixNumbersArray.map((sixNumbers) => new Lotto(sixNumbers));
  }

  #validateSixNumbersArray(sixNumbersArray) {
    if (!Array.isArray(sixNumbersArray)) {
      throw new Error();
    }

    if (sixNumbersArray.length === 0) {
      throw new Error();
    }

    if (sixNumbersArray.some((sixNumbers) => !Array.isArray(sixNumbers))) {
      throw new Error();
    }
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
