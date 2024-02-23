import { validateBonusNumber } from '../utils/validation.js';

export default class WinningLotto {
  #lotto;

  #bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;
    validateBonusNumber(this.#lotto.getNumbers, bonusNumber);

    this.#bonusNumber = bonusNumber;
  }

  calculateWinner(numbers) {
    return { correct: this.#correctCount(numbers), hasBonusNumber: this.#hasBonusNumber(numbers) };
  }

  #correctCount(numbers) {
    return numbers.filter((number) => this.#lotto.getNumbers.includes(number)).length;
  }

  #hasBonusNumber(numbers) {
    return numbers.includes(this.#bonusNumber);
  }

  get getLottoNumbers() {
    return this.#lotto.getNumbers;
  }

  get getBonusNumber() {
    return this.#bonusNumber;
  }
}
