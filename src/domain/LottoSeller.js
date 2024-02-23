import RandomUniquePositiveIntegersPicker from "../utils/RandomNumbersPicker.js";
import Lotto from "./Lotto.js";

class LottoSeller {
  static LOTTO_PRICE = 1000;
  static #randomNumbersPicker = new RandomUniquePositiveIntegersPicker(
    Lotto.MAX_LOTTO_NUMBER
  );

  static sellLottos(amount) {
    const lottoCount = this.#calculateLottoCount(amount);
    return this.#pickLottos(lottoCount);
  }

  static #calculateLottoCount(price) {
    return Math.floor(price / LottoSeller.LOTTO_PRICE);
  }

  static #pickLottos(count) {
    return new Array(count).fill().map((_) => this.#pickLotto());
  }

  static #pickLotto() {
    const numbers = this.#pickRandomNumbers();
    return new Lotto(numbers);
  }

  static #pickRandomNumbers() {
    return this.#randomNumbersPicker.getRandomUniquePositiveIntegers(6);
  }
}

export default LottoSeller;
