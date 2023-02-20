import LottoFactory from './LottoFactory';

class Lotto {
  #numbers = [];

  constructor(numbers = LottoFactory.generateNumbers()) {
    this.validateNumbers(numbers);

    this.#numbers = [...numbers].sort((a, b) => a - b);
  }

  // TODO: validation
  getNumbers() {
    return [...this.#numbers];
  }

  hasBonus(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }

  countMatch(lotto) {
    return this.#numbers.filter(lotto.#numbers.includes).length;
  }
}

export default Lotto;
