import RandomLottoGenerator from "./RandomLottoGenerator.js";

class LottoSeller {
  static LOTTO_PRICE = 1000;

  static sellLottos(price) {
    const lottoCount = this.#calculateLottoCount(price);
    return this.#pickLottos(lottoCount);
  }

  static #calculateLottoCount(price) {
    return Math.floor(price / LottoSeller.LOTTO_PRICE);
  }

  static #pickLottos(count) {
    return Array.from({ length: count }).map(() => this.#picklotto());
  }

  static #picklotto() {
    return RandomLottoGenerator.getRandomLotto();
  }
}

export default LottoSeller;
