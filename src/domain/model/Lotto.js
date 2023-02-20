import LottoFactory from '../LottoFactory';

class Lotto {
  #numbers = [];

  constructor(numbers = LottoFactory.generateNumbers()) {
    this.#numbers = [...numbers].sort((a, b) => a - b);
  }

  getNumbers() {
    return [...this.#numbers];
  }

  hasBonus(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }

  countMatch(lotto) {
    return this.#numbers.filter((number) => lotto.#numbers.includes(number)).length;
  }
}

export default Lotto;
