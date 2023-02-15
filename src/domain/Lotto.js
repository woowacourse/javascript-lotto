import Validation from "../utils/Validation.js";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validateNumbers(numbers);
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validateNumbers(numbers) {
    Validation.checkLottoNumber(numbers);
  }

  getNumbers() {
    return [...this.#numbers];
  }

  getMatchState({ winningNumbers, bonusNumber }) {
    const MATCH_COUNT = this.getMatchCount(winningNumbers);
    const BONUS_MATCH = this.hasBonusNumber(bonusNumber);

    return { MATCH_COUNT, BONUS_MATCH };
  }

  getMatchCount(winningNumbers) {
    return this.#numbers.filter((number) => winningNumbers.includes(number))
      .length;
  }

  hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;
