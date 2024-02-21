import lottoNumberValidator from "../validator/LottoNumberValidator.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    lottoNumberValidator.validate(numbers);

    this.#numbers = numbers;
  }

  getNumbers() {
    return this.#numbers;
  }

  getMatchCount(winningLotto) {
    const numberMatchCount = this.#numbers.filter((number) =>
      winningLotto.getNumbers().includes(number),
    ).length;

    const isBonus = this.#numbers.includes(winningLotto.getBonusNumber());

    return { numberMatchCount, isBonus };
  }

  getRank(winningLotto) {
    const { numberMatchCount, isBonus } = this.getMatchCount(winningLotto);

    if (numberMatchCount === 6) return 1;
    if (numberMatchCount === 5 && isBonus) return 2;
    if (numberMatchCount === 5) return 3;
    if (numberMatchCount === 4) return 4;
    if (numberMatchCount === 3) return 5;
    return 6;
  }
}
export default Lotto;
