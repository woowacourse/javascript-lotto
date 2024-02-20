import Lotto from "./Lotto";

class LottoSeller {
  static LOTTO_PRICE = 1000;

  sellLottos(amount) {
    const lottoCount = this.#calculateLottoCount(amount);
    return this.#pickLottos(lottoCount);
  }

  #calculateLottoCount(amount) {
    return amount / LottoSeller.LOTTO_PRICE;
  }

  #pickLottos(count) {
    return new Array(count).fill().map((_) => this.#pickLotto());
  }

  #pickLotto() {
    const numbers = this.#pickRandomNumbers();
    return new Lotto(numbers);
  }

  #pickRandomNumbers() {
    const wholeNumbers = new Array(Lotto.MAX_LOTTO_NUMBER)
      .fill()
      .map((_, index) => index + 1);

    const shuffledNumbers = wholeNumbers.sort(() => Math.random() - 0.5);

    return shuffledNumbers.slice(0, Lotto.NUMBERS_LENGTH);
  }
}

export default LottoSeller;
