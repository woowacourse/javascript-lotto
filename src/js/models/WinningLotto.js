export default class WinningLotto {
  #winningNumbers;
  #bonusNumber;

  constructor({ winningNumbers, bonusNumber }) {
    this.#winningNumbers = new Set(winningNumbers);
    this.#bonusNumber = bonusNumber;
  }

  get winningNumbers() {
    return this.#winningNumbers;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  pushNumber(number) {
    this.#winningNumbers.add(number);
  }
}
