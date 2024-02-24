import UniquePositivePicker from "../utils/UniquePositivePicker.js";
import Lotto from "./Lotto.js";

class LottoSeller {
  static LOTTO_PRICE = 1000;
  static #randomNumbersPicker = new UniquePositivePicker(
    () => 1 + Math.floor(Math.random() * Lotto.MAX_LOTTO_NUMBER),
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
    return this.#randomNumbersPicker.getUniquePositiveIntegers(
      Lotto.NUMBERS_LENGTH
    );
  }
}

export default LottoSeller;
