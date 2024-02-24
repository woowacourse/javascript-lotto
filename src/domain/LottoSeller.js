import UniquePositivesPicker from "../utils/UniquePositivesPicker.js";
import NUMBERS from "./constants/numbers.js";

class LottoSeller {
  static LOTTO_PRICE = 1000;
  static #lottoPicker = new UniquePositivesPicker(
    () => 1 + Math.floor(Math.random() * NUMBERS.maxLottoNumber),
    NUMBERS.maxLottoNumber
  );

  static sellLottos(price) {
    const lottoCount = this.#calculateLottoCount(price);
    return this.#pickLottos(lottoCount);
  }

  static #calculateLottoCount(price) {
    return Math.floor(price / LottoSeller.LOTTO_PRICE);
  }

  static #pickLottos(count) {
    return Array.from({ length: count }).map(() => {
      const lotto = this.#pickRandomNumbers();
      lotto.sort((a, b) => a - b);
      return lotto;
    });
  }

  static #pickRandomNumbers() {
    return this.#lottoPicker.getUniquePositiveIntegers(
      NUMBERS.lottoNumbersLength
    );
  }
}

export default LottoSeller;
