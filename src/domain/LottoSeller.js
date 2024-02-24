import Lotto from "./Lotto.js";
import LottoNumber from "./LottoNumber.js";

class LottoSeller {
  static LOTTO_PRICE = 1000;

  static sellLottos(amount) {
    const lottoCount = this.#calculateLottoCount(amount);
    return this.#pickLottos(lottoCount);
  }

  static #calculateLottoCount(amount) {
    return Math.floor(amount / LottoSeller.LOTTO_PRICE);
  }

  static #pickLottos(count) {
    return new Array(count).fill().map((_) => this.#pickLotto());
  }

  static #pickLotto() {
    const numbers = this.#pickRandomNumbers();

    return new Lotto(numbers);
  }

  static #pickRandomNumbers() {
    const wholeNumbers = new Array(LottoNumber.MAX_LOTTO_NUMBER)
      .fill()
      .map((_, index) => index + 1);

    const shuffledNumbers = wholeNumbers.sort(() => Math.random() - 0.5);

    return shuffledNumbers.slice(0, Lotto.NUMBERS_LENGTH);
  }
}

export default LottoSeller;
